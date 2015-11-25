import React, {Component } from 'react';
import Map from '../components/Map/Map';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mapLayers = {
            base: 'http://map-warehouse.jcbel.com/v1/maps/a9ea816accd48c77d53866ead23df7a3',
            controls: [
                {type: 'line', strokeStyle: 'rgba(255, 0, 0, 1)', lineWidth: 1},
                {type: 'rect', strokeStyle: 'rgba(0, 0, 230, 0.4)', lineWidth: 0.5},
            ],
        };

        return (
            <div className="container">

                {/* navbar */}
                <div className="offcanvas-bar">
                </div>

                {/* main */}
                <div className="main">
                    <Map
                        extent={[3948, 3000]}
                        center={[0, 0]}
                        minZoom={1}
                        maxZoom={2}
                        zoom={1}
                        layers={mapLayers}
                        />
                </div>
            </div>
        );
    }
}

