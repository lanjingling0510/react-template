import MapShape from './MapShape';
import MapPoint from './MapPoint';

/* ************ 地图线段 ************** */
class MapLine extends MapShape {
    constructor(props = {}) {
        super(props);
        this.strokeStyle = props.strokeStyle;
        this.lineWidth = props.lineWidth;
        this.pointType = null;
        this.mapPoints = [];
    }

    addMapPoint = (point) => {
        this.insertMapPoint(point, this.mapPoints.length - 1);
    }

    insertMapPoint = (point, startAt) => {
        const newMapPoint = new MapPoint();
        newMapPoint.setPointType(this.pointType);
        newMapPoint.setMapPoint(point);
        this.mapPoints.splice(startAt + 1, 0, newMapPoint);
    }

    setPointType = (options) => {
        this.pointType = options;
    }

    draw = (canvas, x, y, zoom) => {
        const mapPoints = this.mapPoints;
        this.drawToMap(canvas, x, y, zoom);
        mapPoints.forEach(value => {
            value.drawToMap(canvas, x, y, zoom);
        });
    }

    drawToMap = (canvas, x, y, zoom) => {
        const context = canvas.getContext('2d');
        const viewWidth = canvas.width;
        const viewHeight = canvas.height;
        const mapPoints = this.mapPoints;

        context.save();
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        mapPoints.forEach((mapPoint, index) => {
            const point = mapPoint.point;
            const x1 = (point.x + x - viewWidth / 2) * zoom + viewWidth / 2;
            const y1 = (point.y + y - viewHeight / 2) * zoom + viewHeight / 2;
            if (index === 0) {
                context.moveTo(x1, y1);
            } else {
                context.lineTo(x1, y1);
            }
        });
        context.stroke();
        context.restore();
    }
}

export default MapLine;
