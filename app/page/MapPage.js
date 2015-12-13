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
                {
                    type: 'line',
                    strokeStyle: 'red',
                    lineWidth: 4,
                    pointStyle: {
                        strokeStyle: '#20CA20',
                        fillStyle: '#F904E4',
                        lineWidth: 5,
                        radius: 4,
                    },
                    onComplete: (pointList) => {
                    },
                },
                {
                    type: 'polygon',
                    strokeStyle: 'rgba(0, 0, 230, 0.4)',
                    fillStyle: 'red',
                    lineWidth: 2,
                    pointStyle: {
                        strokeStyle: 'rgba(0, 0, 230, 0.4)',
                        fillStyle: 'blue',
                        lineWidth: 1,
                        radius: 5,
                    },
                    onUpdate: (pointList) => {
                    },
                    onComplete: (pointList) => {
                    },
                },
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
                        minZoom={0.5}
                        maxZoom={2}
                        zoom={1}
                        layers={mapLayers}
                        />
                </div>
            </div>
        );
    }
}

