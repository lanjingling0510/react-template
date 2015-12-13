import MapLine from './MapLine';


/* ************ 地图多边形 ************** */
class MapPolygon extends MapLine {
    constructor(props = {}) {
        super(props);
        this.fillStyle = props.fillStyle;
    }

    drawToMap = (canvas, x, y, zoom) => {
        const context = canvas.getContext('2d');
        const viewWidth = canvas.width;
        const viewHeight = canvas.height;
        const mapPoints = this.mapPoints;
        const firstPoint = {};

        context.save();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
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
                firstPoint.x = x1;
                firstPoint.y = y1;
            } else if (index === mapPoints.length - 1) {
                context.lineTo(x1, y1);
                context.lineTo(firstPoint.x, firstPoint.y);
            } else {
                context.lineTo(x1, y1);
            }
        });
        context.fill();
        context.stroke();
        context.restore();
    }
}

export default MapPolygon;
