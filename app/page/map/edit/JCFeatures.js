import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import Selected from '../../../components/Selected.js';
import FormEditor from '../../../components/FormEditor.js';
import AccordionItem from '../../../components/AccordionItem';

class JCFeatures extends Component {
    static propTypes = {
        layers: PropTypes.arrayOf(PropTypes.object),
        onSelectJCFeatures: PropTypes.func,
        onSaveJCFeature: PropTypes.func,
        onDeleteJCFeature: PropTypes.func,
    }

    state = {
        features: [],
    }

    handleSelectLayerChange = (layerID) => {
        const {onSelectJCFeatures, layers} = this.props;
        const JCLayer = layers.find(layer => layer._id === layerID);
        onSelectJCFeatures(JCLayer).then((features) => {
            this.setState({features: features});
        });
    }

    renderSelected = () => {
        const {layers} = this.props;
        const data = layers.map(layer => {
            return {
                label: layer.JCName,
                value: layer._id,
            };
        });
        const selectProps = {
            data,
            onChange: this.handleSelectLayerChange,
            size: 'sm',
        };
        return <Selected {...selectProps} />;
    }

    renderFeature = (feature, index) => {
        const {onSaveJCFeature, onDeleteJCFeature} = this.props;
        return (
            <AccordionItem key={index} title={feature.JCFeatureType}>
                <div className="card-block">
                    <FormEditor
                        data={feature}
                        onSave={onSaveJCFeature}
                        onDelete={onDeleteJCFeature}
                        />
                </div>
            </AccordionItem>
        );
    }

    render() {
        const {features} = this.state;
        return (
            <div>
                <div className="form margin-bottom">
                    <div className="form-group">
                        <label className="form-label">layer:</label>
                        {this.renderSelected()}
                    </div>
                </div>
                <div className="margin-bottom">
                    {features.map(this.renderFeature)}
                </div>
            </div>
        );
    }
}

export default connect(null)(JCFeatures);
