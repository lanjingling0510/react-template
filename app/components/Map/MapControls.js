import events from '../../utils/Events.js';

class MapControls {
    constructor({canvas, controls, mapEvent}) {
        //  config
        this.controls = controls;
        this.mapEvent = mapEvent;

        //  common object
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
        const canvas = this.canvas;
        events.on(canvas, 'mousedown', this.handleMapMouseDown);
        events.on(canvas, 'mousemove', this.handleMapMouseMove);
        events.on(canvas, 'mouseup', this.handleMapMouseEnd);
    }


    // 清除事件...............................................
    clearEvents = () => {
        const canvas = this.canvas;
        events.off(canvas, 'mousedown', this.handleMapMouseDown);
        events.off(canvas, 'mousemove', this.handleMapMouseMove);
        events.off(canvas, 'mouseup', this.handleMapMouseEnd);
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
        this.restoreDrawingSurface();
        this.drawLine(point);
        this.state = null;
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
    saveDrawingSurface = () => {
        this.drawingSurfaceImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    restoreDrawingSurface = () => {
        this.context.putImageData(this.drawingSurfaceImageData, 0, 0);
    }

    clearDrawingSurface = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //  update base image
    updateBaseCanvas = () => {
        const mapEvent = this.mapEvent;
        const baseCanvas = mapEvent.baseCanvas;
        const context = baseCanvas.getContext('2d');
        const translate = mapEvent.translate;
        const zoom = mapEvent.zoom;
        const sw = this.canvas.width / zoom;
        const sh = this.canvas.height / zoom;
        const sx = -translate[0] / zoom + (mapEvent.extent[0] - sw) / 2;
        const sy = -translate[1] / zoom + (mapEvent.extent[1] - sh) / 2;
        context.drawImage(this.canvas, sx, sy, sw, sh);
    }

    windowToCanvas(x, y) {
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
