import MapShape from './MapShape';


/* ************ 地图背景类 ************** */
class MapBase extends MapShape {
    constructor(props) {
        super(props);
        this.url = props.url;
    }

    // 初始化 .........................
    initialize = async () => {
        this.baseCanvas = document.createElement('canvas');
        this.baseCanvas.width = this.width;
        this.baseCanvas.height = this.height;

        return new Promise((resolve) => {
            const image = document.createElement('img');
            image.onload = () => {
                this.baseCanvas.getContext('2d').drawImage(image, 0, 0);
                resolve();
            };
            image.src = this.url;
            image.setAttribute('crossOrigin', 'anonymous');
        });
    }

    setTranslate = (x, y) => {
        this.x = x;
        this.y = y;
    }

    setZoom = (zoom) => {
        this.zoom = zoom;
    }

    draw = (canvas) => {
        const context = canvas.getContext('2d');
        const viewWidth = canvas.width;
        const viewHeight = canvas.height;
        context.save();
        //  设置缩放中心，并进行缩放
        context.transform(this.zoom, 0, 0, this.zoom, viewWidth / 2, viewHeight / 2);
        //  恢复缩放中心，并位移
        context.transform(1, 0, 0, 1, -viewWidth / 2 + this.x, -viewHeight / 2 + this.y);
        context.drawImage(this.baseCanvas,
            0, 0,
            this.width, this.height);
        context.restore();
    }
}

export default MapBase;
