import events from '../../utils/Events.js';


class MapControls {
    constructor({container, canvas, controls}) {
        /*  config */
        this.controls = controls;
        this.strokeStyle = 'rgb(0, 153, 255)';
        this.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.lineWidth = 4;
        this.radius = 4;

        /* common object */
        this.container = container;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.lineList = [];
        this.linePointList = [];
        this.polygonList = [];
        this.polygonPointList = [];
        this.tempPointList = [];

        /* event params */
        this.lineConfig = null;
        this.polygonConfig = null;
        this.toolStatus = null;
    }

    //  设置当前的画图状态, 用来判断当前的画图行为
    setToolStatus = (status) => {
        this.toolStatus = status;
    }

    //  地图工具初始化配置..........................................
    initMapControls = () => {
        this.lineConfig = this.controls.find(value => value.type === 'line');
        this.polygonConfig = this.controls.find(value => value.type === 'polygon');
        this.bindDrawCanvasEvent();
    }

    // 绑定事件..............................................
    bindDrawCanvasEvent = () => {
        this.emitter.on('drawCanvas', () => {
            this.drawMapCanvas();
        });
    }


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
        const point = this.windowToCanvas(e.pageX, e.pageY);
        if (this.toolStatus === 'drawLine') {
            this.line_mouseDown(point);
        } else if (this.toolStatus === 'drawPolygon') {
            this.polygon_mouseDown(point);
        }
    }

    handleMapMouseMove = (e) => {
        e.preventDefault();
        const point = this.windowToCanvas(e.pageX, e.pageY);
        this.restoreDrawingSurface();

        if (this.toolStatus === 'drawLine') {
            this.line_mouseMove(point);
        } else if (this.toolStatus === 'drawPolygon') {
            this.polygon_mouseMove(point);
        }

        this.drawGuidewires(point);
        this.drawPoint(point);
    }

    handleMapMouseEnd = (e) => {
        const point = this.windowToCanvas(e.pageX, e.pageY);
        this.restoreDrawingSurface();
        if (this.toolStatus === 'drawLine') {
            this.line_mouseUp(point);
        } else if (this.toolStatus === 'drawPolygon') {
            this.polygon_mouseUp(point);
        }
        this.saveDrawingSurface();
    }


    //  绘画API ................................................

    // 将绘制的图形表现在绘制阶段
    drawCanvas = () => {
        this.clearMapControlsCanvas();
        if (this.toolStatus === 'drawLine') {
            this.lineList.forEach(line => line.draw(this.canvas, this.x, this.y, this.zoom));
            this.polygonList.forEach(polygon => polygon.drawToMap(this.canvas, this.x, this.y, this.zoom));
        } else if (this.toolStatus === 'drawPolygon') {
            this.lineList.forEach(line => line.drawToMap(this.canvas, this.x, this.y, this.zoom));
            this.polygonList.forEach(polygon => polygon.draw(this.canvas, this.x, this.y, this.zoom));
        }
    }

    //  将绘制的图形表现在地图操作阶段
    drawMapCanvas = () => {
        this.clearMapControlsCanvas();
        this.lineList.forEach(line => line.drawToMap(this.canvas, this.x, this.y, this.zoom));
        this.polygonList.forEach(polygon => polygon.drawToMap(this.canvas, this.x, this.y, this.zoom));
    }

    //  绘制地图时的指导线段
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

    drawPolygon = (pointList) => {
        const context = this.context;
        context.save();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        context.lineCap = 'round';
        context.beginPath();
        pointList.forEach((point, index) => {
            if (index === 0) {
                context.moveTo(point.x, point.y);
            } else if (index === pointList.length - 1) {
                context.lineTo(point.x, point.y);
                context.lineTo(pointList[0].x, pointList[0].y);
            } else {
                context.lineTo(point.x, point.y);
            }
        });
        context.fill();
        context.restore();
    }

    drawLine = (x1, y1, x2, y2) => {
        const context = this.context;
        context.save();
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.restore();
    }

    drawPoint = ({x, y}) => {
        const context = this.context;
        context.save();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(x, y, this.radius, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.restore();
    }


    //  公共函数 .............................................................

    getPointBound = (point) => {
        return {
            x: point.x - this.radius,
            y: point.y - this.radius,
            width: 2 * this.radius,
            height: 2 * this.radius,
        };
    }

    checkCircleInCircle = (point1, point2) => {
        const bound1 = this.getPointBound(point1);
        const bound2 = this.getPointBound(point2);
        return !(bound1.x > bound2.x + bound2.width || bound1.x + bound1.width < bound2.x ||
        bound1.y > bound2.y + bound2.height || bound1.y + bound1.height < bound2.y);
    }


    // 绘图坐标转换成地图实际坐标
    transformViewPointToMapPoint = (point, canvas, x, y, zoom) => {
        const viewWidth = canvas.width;
        const viewHeight = canvas.height;
        const mapPoint = {};
        // 原理：变换坐标原点为视图中心，然后缩放，然后恢复坐标原点，最后偏移到实际坐标
        mapPoint.x = (point.x - viewWidth / 2) / zoom + viewWidth / 2 - x;
        mapPoint.y = (point.y - viewHeight / 2) / zoom + viewHeight / 2 - y;
        return mapPoint;
    }

    saveDrawingSurface = () => {
        this.drawingSurfaceImageData = this.context.getImageData(0, 0,
            this.canvas.width, this.canvas.height);
    }

    restoreDrawingSurface = () => {
        this.context.putImageData(this.drawingSurfaceImageData, 0, 0);
    }

    clearMapControlsCanvas = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearTempList = () => {
        this.tempPointList = [];
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
