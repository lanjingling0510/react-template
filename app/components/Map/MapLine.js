import MapShape from './MapShape';


/* ************ 地图线段 ************** */
class MapLine extends MapShape {
    constructor(props) {
        super(props);
        this.strokeStyle = props.strokeStyle;
        this.lineWidth = props.lineWidth;
        this.point1 = null;
        this.point2 = null;
    }

    setPoints = (point1, point2) => {
        this.point1 = point1;
        this.point2 = point2;
    }

    draw = (canvas) => {
        const context = canvas.getContext('2d');
        const viewWidth = canvas.width;
        const viewHeight = canvas.height;
        context.save();
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        //  设置缩放中心，并进行缩放
        context.transform(this.zoom, 0, 0, this.zoom, viewWidth / 2, viewHeight / 2);
        //  恢复缩放中心，并位移
        context.transform(1, 0, 0, 1, -viewWidth / 2 + this.x, -viewHeight / 2 + this.y);
        context.beginPath();
        context.moveTo(this.point1.x, this.point1.y);
        context.lineTo(this.point2.x, this.point2.y);
        context.stroke();
        context.restore();
    }
}

export default MapLine;
