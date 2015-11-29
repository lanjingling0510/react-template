import React, {Component, PropTypes} from 'react';
import './Map.css';
import classNames from 'classnames';
import MapConfig from './MapConfig';
import initMapEvent from './MapEvent';
import initMapControls from './MapControls';


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


    handleLineToolClick = () => {
        const state = this.state;
        if (state.mapAction) {
            state.mapControls.clearEvents();
            state.mapControls.clearDrawingSurface();
            state.mapEvent.bindEvents();
            state.mapEvent.drawCanvas();
            this.setState({
                mapAction: null,
            });
        } else {
            state.mapEvent.clearEvents();
            state.mapControls.bindEvents();
            this.setState({
                mapAction: 'drawLine',
            });
        }
    }

    renderControls = () => {
        const controls = this.props.layers.controls;
        if (!controls) return;
        const lineTool = controls.find(value => value.type === 'line');
        const rectTool = controls.find(value => value.type === 'rect');

        return (
            <div className="overlay-controls">
                <div className="btn-group">
                    {lineTool ? this.renderLineTool() : null}
                    {rectTool ? this.renderRectTool() : null}
                </div>
            </div>
        );
    }


    renderLineTool = () => {
        const lineToolClassName = classNames('btn', 'btn-primary', 'btn-raised', {
            active: this.state.mapAction === 'drawLine',
        });
        return (
            <a className={lineToolClassName} onClick={this.handleLineToolClick}>
                直线
            </a>
        );
    }

    renderRectTool = () => {
        return <a className="btn btn-primary btn-raised">区域</a>;
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


