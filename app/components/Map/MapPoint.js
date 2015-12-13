import MapShape from './MapShape';


/* ************ 地图点 ************** */
class MapPoint extends MapShape {
    constructor(props = {}) {
        super(props);
        this.strokeStyle = props.strokeStyle;
        this.fillStyle = props.fillStyle;
        this.lineWidth = props.lineWidth;
        this.radius = props.radius || 4;
        this.point = {};            // 相对于地图canvas的坐标
    }

    setMapPoint = ({x, y}) => {
        this.point.x = x;
        this.point.y = y;
    }

    setPointType = (options) => {
        Object.assign(this, options);
    }

    drawToMap = (canvas, x, y, zoom) => {
        const context = canvas.getContext('2d');
        const viewWidth = canvas.width;
        const viewHeight = canvas.height;
        const point = this.point;
        context.save();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        // context.transform(zoom, 0, 0, zoom, viewWidth / 2, viewHeight / 2);//  设置缩放中心，并进行缩放
        // context.transform(1, 0, 0, 1, -viewWidth / 2 + x, -viewHeight / 2 + y);//  恢复缩放中心，并位移
        const arcX = (point.x + x - viewWidth / 2) * zoom + viewWidth / 2;
        const arcY = (point.y + y - viewHeight / 2) * zoom + viewHeight / 2;

        context.beginPath();
        context.arc(arcX, arcY, this.radius, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.restore();
    }

    draw = (canvas) => {
        const context = canvas.getContext('2d');
        const point = this.point;
        context.save();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(point.x, point.y, this.radius, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.restore();
    }
}

export default MapPoint;

