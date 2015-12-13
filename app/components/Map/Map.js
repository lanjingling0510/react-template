// TODO : refrence https://github.com/lanjingling0510/ememtn-mng/blob/6f5bdf69ee6b2a2ed9f5e3996213f78efd08b09d/src/pavilion/map/pavilion_canvas.js

import React, {Component, PropTypes} from 'react';
import './Map.css';
import classNames from 'classnames';
import MapConfig from './MapConfig';
import initMapEvent from './MapEvent';
import initMapControls from './MapControls';
import drawLine from './MapDrawLine';
import drawPolygon from './MapDrawPolygon';


class Map extends Component {
    static propTypes = {
        extent: PropTypes.array.isRequired,
        translate: PropTypes.array,
        minZoom: PropTypes.number,
        maxZoom: PropTypes.number,
        zoom: PropTypes.number,
        layers: PropTypes.object.isRequired,
        mapEvent: PropTypes.object,
        mapControls: PropTypes.object,
        mapAction: PropTypes.string,
    }

    static defaultProps = {
        translate: [0, 0],
        minZoom: 1,
        maxZoom: 13,
        zoom: 1,
        mapEvent: null,
        mapControls: null,
        mapAction: null,
    }

    state = {
        mapEvent: this.props.mapEvent,
        mapControls: this.props.mapControls,
        mapAction: this.props.mapAction,
    }


    componentDidMount() {
        const props = this.props;
        let mapControls = null;
        this.initCanvas();

        const mapConfig = new MapConfig({
            extent: props.extent,
            minZoom: props.minZoom,
            maxZoom: props.maxZoom,
            zoom: props.zoom,
            translate: props.translate,
            layers: props.layers,
        });

        const mapEvent = initMapEvent({
            container: this.canvasContainer,
            canvas: this.mapCanvas,
        });

        Object.setPrototypeOf(mapEvent, mapConfig);
        mapEvent.initMapEvent();

        if (props.layers.controls && props.layers.controls.length > 0) {
            mapControls = initMapControls({
                container: this.canvasContainer,
                canvas: this.drawCanvas,
                controls: props.layers.controls,
            });
            Object.setPrototypeOf(mapControls, mapConfig);
            Object.assign(mapControls, drawLine);
            Object.assign(mapControls, drawPolygon);
            mapControls.initMapControls();
        }

        // TODO :help to debug
        window.mapEvent = mapEvent;
        window.mapControls = mapControls;

        this.setState({
            mapEvent: mapEvent,
            mapControls: mapControls,
        });
    }

    initCanvas = () => {
        const mapCanvas = this.mapCanvas = this.refs.mapCanvas;
        const drawCanvas = this.drawCanvas = this.refs.drawCanvas;
        const mapContainer = this.mapContainer = this.refs.mapContainer;
        this.canvasContainer = this.refs.canvasContainer;
        mapCanvas.width = drawCanvas.width = mapContainer.offsetWidth;
        mapCanvas.height = drawCanvas.height = mapContainer.offsetHeight;
    }


    handleToolClick = (action) => {
        const state = this.state;
        state.mapControls.clearTempList();
        if (state.mapAction === action) {
            // 切换到地图操作
            state.mapControls.clearEvents();
            state.mapControls.setToolStatus(null);
            state.mapControls.drawMapCanvas();
            state.mapEvent.bindEvents();
            this.setState({
                mapAction: null,
            });
        } else if (!state.mapAction) {
            // 从地图操作切换到当前地图工具状态
            state.mapEvent.clearEvents();
            state.mapControls.bindEvents();
            state.mapControls.setToolStatus(action);
            state.mapControls.drawCanvas();
            state.mapControls.saveDrawingSurface();
            this.setState({
                mapAction: action,
            });
        } else {
            // 从一个地图工具切换到另一个地图工具
            state.mapControls.setToolStatus(action);
            state.mapControls.drawCanvas();
            state.mapControls.saveDrawingSurface();
            this.setState({
                mapAction: action,
            });
        }
    }


    renderControls = () => {
        const controls = this.props.layers.controls;
        if (!controls) return;
        const lineTool = controls.find(value => value.type === 'line');
        const polygonTool = controls.find(value => value.type === 'polygon');

        return (
            <div className="overlay-controls">
                <div className="btn-group">
                    {lineTool ? this.renderLineTool() : null}
                    {polygonTool ? this.renderPolygonTool() : null}
                </div>
            </div>
        );
    }


    renderLineTool = () => {
        const lineToolClassName = classNames('btn', 'btn-primary', 'btn-raised', {
            active: this.state.mapAction === 'drawLine',
        });
        return (
            <a className={lineToolClassName} onClick={this.handleToolClick.bind(null, 'drawLine')}>
                直线
            </a>
        );
    }

    renderPolygonTool = () => {
        const polygonToolClassName = classNames('btn', 'btn-primary', 'btn-raised', {
            active: this.state.mapAction === 'drawPolygon',
        });
        return (
            <a className={polygonToolClassName} onClick={this.handleToolClick.bind(null, 'drawPolygon')}>
                多边形
            </a>
        );
    }

    render() {
        const props = this.props;
        const containerClassNames = classNames('map-container', props.className);

        return (
            <div className={containerClassNames} ref="mapContainer">
                <div className="overlay-canvas" ref="canvasContainer">
                    <canvas ref="mapCanvas"></canvas>
                    <canvas ref="drawCanvas"></canvas>
                </div>

                {this.renderControls()}
            </div>
        );
    }
}

export default Map;


