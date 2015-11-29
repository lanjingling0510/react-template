class MapShape {
    constructor({x, y, width, height, zoom = 1}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.zoom = zoom;
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    setTranslate(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default MapShape;
