import events from '../../utils/Events.js';

class MapEvent {
    constructor({canvas, minZoom, maxZoom, zoom, extent, translate, layers}) {
        //  config
        this.extent = extent;
        this.translate = translate;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.layers = layers;

        //  common object
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.tempCanvas = null;
        this.baseCanvas = null;

        //  event params
        this.scaleDistance = 0;
        this.zoom = zoom;
        this.scaleRatio = Infinity;
        this.dragPoint = null;
        this.state = null;

        this.initMapEvent();
        this.renderBaseLayer();
        this.bindEvents();
    }

    //  地图事件初始化配置..........................................
    initMapEvent = () => {
        this.baseCanvas = document.createElement('canvas');
        this.baseCanvas.width = this.extent[0];
        this.baseCanvas.height = this.extent[1];
    }

    // 绑定事件..............................................
    bindEvents = () => {
        const canvas = this.canvas;
        events.on(canvas, 'touchstart', this.handleMapTouchStart);
        events.on(canvas, 'touchmove', this.handleMapTouchMove);
        events.on(canvas, 'touchend', this.handleMapTouchEnd);
        events.on(canvas, 'mousedown', this.handleMapMouseDown);
        events.on(canvas, 'mousemove', this.handleMapMouseMove);
        events.on(canvas, 'mouseup', this.handleMapMouseEnd);
    }


    // 清除事件...............................................
    clearEvents = () => {
        const canvas = this.canvas;
        events.off(canvas, 'touchstart', this.handleMapTouchStart);
        events.off(canvas, 'touchmove', this.handleMapTouchMove);
        events.off(canvas, 'touchend', this.handleMapTouchEnd);
        events.off(canvas, 'mousedown', this.handleMapMouseDown);
        events.off(canvas, 'mousemove', this.handleMapMouseMove);
        events.off(canvas, 'mouseup', this.handleMapMouseEnd);
    }

    renderBaseLayer = () => {
        const image = document.createElement('img');
        image.onload = () => {
            this.baseCanvas.getContext('2d').drawImage(image, 0, 0);
            this.drawBase();
        };
        image.src = this.layers.base;
        image.setAttribute('crossOrigin', 'anonymous');
    }


    //  事件的处理器 .......................................................
    handleMapTouchStart = (e) => {
        e.preventDefault();
        if (this.isDragging(e)) {
            this.state = 'dragging';
            this.mouseDownOrTouchStart(this.windowToCanvas(e.touches[0].pageX, e.touches[0].pageY));
        } else if (this.isScaleing(e)) {
            this.state = 'scaleing';
            const touch1 = e.touches.item(0);
            const touch2 = e.touches.item(1);
            const point1 = this.windowToCanvas(touch1.pageX, touch1.pageY);
            const point2 = this.windowToCanvas(touch2.pageX, touch2.pageY);

            this.scaleDistance = Math.sqrt(Math.pow(point2.x - point1.x, 2) +
                Math.pow(point2.y - point1.y, 2));

            this.scaleRatio = this.zoom / this.scaleDistance;
        }
    }

    handleMapTouchMove = (e) => {
        if (this.state === 'dragging') {
            this.mouseMoveOrTouchMove(this.windowToCanvas(e.touches[0].pageX, e.touches[0].pageY));
        } else if (this.state === 'scaleing') {
            const touch1 = e.touches.item(0);
            const touch2 = e.touches.item(1);
            const point1 = this.windowToCanvas(touch1.pageX, touch1.pageY);
            const point2 = this.windowToCanvas(touch2.pageX, touch2.pageY);

            this.scaleDistance = Math.sqrt(Math.pow(point2.x - point1.x, 2) +
                Math.pow(point2.y - point1.y, 2));

            const scale = this.scaleRatio * this.scaleDistance;

            if (scale > this.minZoom && scale < this.maxZoom) {
                this.zoom = parseFloat(this.scaleRatio * this.scaleDistance).toFixed(2);
            }

            this.drawCanvas();
        }
    }

    handleMapTouchEnd = (e) => {
        e.preventDefault();
        this.state = null;
        this.mouseUpOrTouchEnd(this.windowToCanvas(e.pageX, e.pageY));
    }

    handleMapMouseDown = (e) => {
        e.preventDefault();
        this.state = 'dragging';
        this.mouseDownOrTouchStart(this.windowToCanvas(e.pageX, e.pageY));
    }

    handleMapMouseMove = (e) => {
        if (!this.state) return;
        this.mouseMoveOrTouchMove(this.windowToCanvas(e.pageX, e.pageY));
    }

    handleMapMouseEnd = (e) => {
        e.preventDefault();
        this.state = null;
        this.mouseUpOrTouchEnd(this.windowToCanvas(e.pageX, e.pageY));
    }

    mouseDownOrTouchStart = (point) => {
        this.dragPoint = point;
    }

    mouseMoveOrTouchMove = (point) => {
        this.translate[0] += (point.x - this.dragPoint.x);
        this.translate[1] += (point.y - this.dragPoint.y);
        this.dragPoint = point;
        this.drawCanvas();
    }

    mouseUpOrTouchEnd = () => {
        //  ..................
    }


    //  画图函数 ..........................................................
    drawCanvas = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBase();
    }

    drawBase = () => {
        const extent = this.extent;
        const translate = this.translate;
        const zoom = this.zoom;
        const sw = extent[0] * zoom;
        const sh = extent[1] * zoom;
        const sx = translate[0] * zoom - (sw - this.canvas.width) / 2;
        const sy = translate[1] * zoom - (sh - this.canvas.height) / 2;
        this.context.drawImage(this.baseCanvas, sx, sy, sw, sh);
    }


    //  公共函数 .............................................................
    isScaleing(e) {
        const touchLen = e.touches.length;
        const changedTouchLen = e.changedTouches.length;
        return touchLen === 2 && changedTouchLen === 2 || changedTouchLen === 1;
    }

    isDragging(e) {
        const touchLen = e.touches.length;
        const changedTouchLen = e.changedTouches.length;
        return touchLen === 1 && changedTouchLen === 1;
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


function initMapEvent(options) {
    return new MapEvent(options);
}

export default initMapEvent;
