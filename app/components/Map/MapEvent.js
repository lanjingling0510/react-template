import events from '../../utils/Events.js';
import MapBase from './MapBase.js';


class MapEvent {
    constructor({container, canvas}) {
        //  common object
        this.container = container;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.mapBase = null;

        //  event params
        this.scaleDistance = 0;
        this.scaleRatio = Infinity;
        this.dragPoint = null;
        this.state = null;
        this.bindEvents();
    }

    //  地图事件初始化配置..........................................
    initMapEvent = async () => {
        this.mapBase = new MapBase({
            url: this.layers.base,
            x: this.x,
            y: this.y,
            width: this.extent[0],
            height: this.extent[1],
            zoom: this.zoom,
        });

        await this.mapBase.initialize();
        this.drawCanvas();
    }

    // 绑定事件..............................................
    bindEvents = () => {
        const container = this.container;
        events.on(container, 'touchstart', this.handleMapTouchStart);
        events.on(container, 'touchmove', this.handleMapTouchMove);
        events.on(container, 'touchend', this.handleMapTouchEnd);
        events.on(container, 'mousedown', this.handleMapMouseDown);
        events.on(document, 'mousemove', this.handleMapMouseMove);
        events.on(document, 'mouseup', this.handleMapMouseEnd);
        events.on(container, 'mousewheel', this.handleMapMouseWheel);
    }


    // 清除事件...............................................
    clearEvents = () => {
        const container = this.container;
        events.off(container, 'touchstart', this.handleMapTouchStart);
        events.off(container, 'touchmove', this.handleMapTouchMove);
        events.off(container, 'touchend', this.handleMapTouchEnd);
        events.off(container, 'mousedown', this.handleMapMouseDown);
        events.off(document, 'mousemove', this.handleMapMouseMove);
        events.off(document, 'mouseup', this.handleMapMouseEnd);
        events.off(container, 'mousewheel', this.handleMapMouseWheel);
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
        e.preventDefault();
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
                const prototype = Object.getPrototypeOf(this);
                prototype.zoom = parseFloat(this.scaleRatio * this.scaleDistance).toFixed(2);
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

    handleMapMouseWheel = (e) => {
        const step = 0.05;
        const scale = e.wheelDelta > 0 ? this.zoom + step : this.zoom - step;
        const prototype = Object.getPrototypeOf(this);

        if (scale > this.minZoom && scale < this.maxZoom) {
            prototype.zoom = scale;
        }

        this.drawCanvas();
    }


    mouseDownOrTouchStart = (point) => {
        this.dragPoint = point;
    }

    mouseMoveOrTouchMove = (point) => {
        const prototype = Object.getPrototypeOf(this);
        prototype.x += (point.x - this.dragPoint.x);
        prototype.y += (point.y - this.dragPoint.y);
        this.dragPoint = point;
        this.drawCanvas();
    }

    mouseUpOrTouchEnd = () => {
        //  ..................
    }


    //  画图函数 ..........................................................
    drawCanvas = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const mapBase = this.mapBase;
        mapBase.setTranslate(this.x, this.y);
        mapBase.setZoom(this.zoom);
        mapBase.draw(this.canvas);
        this.lineList.forEach(value => {
            value.setTranslate(this.x, this.y);
            value.setZoom(this.zoom);
            value.draw(this.canvas);
        });
    }


    //  公共函数 .............................................................
    isScaleing = (e) => {
        const touchLen = e.touches.length;
        const changedTouchLen = e.changedTouches.length;
        return touchLen === 2 && changedTouchLen === 2 || changedTouchLen === 1;
    }

    isDragging = (e) => {
        const touchLen = e.touches.length;
        const changedTouchLen = e.changedTouches.length;
        return touchLen === 1 && changedTouchLen === 1;
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


function initMapEvent(options) {
    return new MapEvent(options);
}

export default initMapEvent;
