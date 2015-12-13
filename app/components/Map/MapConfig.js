import eventEmitter from 'event-emitter';


class MapConfig {
    constructor({minZoom, maxZoom, zoom, extent, translate, layers}) {
        //  config
        this.extent = extent;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.layers = layers;
        this.x = translate[0];
        this.y = translate[1];
        this.zoom = zoom;
        this.emitter = eventEmitter({});
    }
}

export default MapConfig;
