import events from '../../utils/Events.js';
import MapLine from './MapLine.js';

class MapControls {
    constructor({container, canvas, controls}) {
        //  config
        this.controls = controls;

        //  common object
        this.container = container;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        //  event params
        this.state = null;
        this.mousedown = null;
        this.lineConfig = null;

        this.initMapControls();
        //  TODO issue:saveDrawingSurface method don't work
        // this.saveDrawingSurface();
    }

    //  地图工具初始化配置..........................................
    initMapControls = () => {
        this.lineConfig = this.controls.find(value => value.type === 'line');
    }

    // 绑定事件..............................................
    bindEvents = () => {
        const container = this.container;
        events.on(container, 'mousedown', this.handleMapMouseDown);
        events.on(container, 'mousemove', this.handleMapMouseMove);
        events.on(container, 'mouseup', this.handleMapMouseEnd);
    }


    // 清除事件...............................................
    clearEvents = () => {
        const container = this.container;
        events.off(container, 'mousedown', this.handleMapMouseDown);
        events.off(container, 'mousemove', this.handleMapMouseMove);
        events.off(container, 'mouseup', this.handleMapMouseEnd);
    }

    //  事件的处理器 .......................................................
    handleMapMouseDown = (e) => {
        e.preventDefault();
        this.saveDrawingSurface();
        this.mousedown = this.windowToCanvas(e.pageX, e.pageY);
        this.state = 'draging';
    }

    handleMapMouseMove = (e) => {
        e.preventDefault();
        if (this.state) {
            const point = this.windowToCanvas(e.pageX, e.pageY);
            this.restoreDrawingSurface();
            this.drawLine(point);
            this.drawGuidewires(point);
        }
    }

    handleMapMouseEnd = (e) => {
        const point = this.windowToCanvas(e.pageX, e.pageY);
        const mapPoint1 = this.transformViewPointToMapPoint(this.mousedown);
        const mapPoint2 = this.transformViewPointToMapPoint(point);
        const mapLine = new MapLine({
            x: this.x,
            y: this.y,
            zoom: this.zoom,
            strokeStyle: this.lineConfig.strokeStyle,
            lineWidth: this.lineConfig.lineWidth,
        });
        this.restoreDrawingSurface();
        this.lineList.push(mapLine);
        this.state = null;
        mapLine.setPoints(mapPoint1, mapPoint2);
        mapLine.draw(this.canvas);
    }


    //  绘画API ................................................
    drawLine = (point) => {
        const context = this.context;
        context.save();
        context.strokeStyle = this.lineConfig.strokeStyle;
        context.lineWidth = this.lineConfig.lineWidth;
        context.beginPath();
        context.moveTo(this.mousedown.x, this.mousedown.y);
        context.lineTo(point.x, point.y);
        context.stroke();
        context.restore();
    }

    drawGuidewires = (point) => {
        const context = this.context;
        context.save();
        context.strokeStyle = 'rgba(0, 0, 230, 0.4)';
        context.lineWidth = 0.5;
        context.beginPath();
        context.moveTo(point.x + 0.5, 0);
        context.lineTo(point.x + 0.5, this.canvas.height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, point.y + 0.5);
        context.lineTo(this.canvas.width, point.y + 0.5);
        context.stroke();
        context.restore();
    }

    //  公共函数 .............................................................

    // 绘图坐标转换成地图实际坐标
    transformViewPointToMapPoint = (point) => {
        const viewWidth = this.canvas.width;
        const viewHeight = this.canvas.height;
        const mapPoint = {};
        // 原理：变换坐标原点为视图中心，缩放，恢复坐标原点，偏移
        mapPoint.x = (point.x - viewWidth / 2) / this.zoom + viewWidth / 2 - this.x;
        mapPoint.y = (point.y - viewHeight / 2) / this.zoom + viewHeight / 2 - this.y;
        return mapPoint;
    }


    saveDrawingSurface = () => {
        this.drawingSurfaceImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    restoreDrawingSurface = () => {
        this.context.putImageData(this.drawingSurfaceImageData, 0, 0);
    }

    clearDrawingSurface = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    windowToCanvas = (x, y) => {
        const canvas = this.canvas;
        const bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height),
        };
    }
}


function initMapControls(options) {
    return new MapControls(options);
}


export default initMapControls;
