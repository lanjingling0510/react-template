import React, { PropTypes, Component } from 'react';
import {showModal, closeModal} from '../../../actions/modal.js';
import AccordionItem from '../../../components/AccordionItem';
import FormEditor from '../../../components/FormEditor.js';
import FormCreator from '../../../components/FormCreator.js';

class JCLayers extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        layers: PropTypes.arrayOf(PropTypes.object),
        newLayer: PropTypes.object,
        onSaveJCLayer: PropTypes.func.isRequired,
        onCreateJCLayer: PropTypes.func.isRequired,
        onDeleteJCLayer: PropTypes.func.isRequired,
    }

    static defaultProps = {
        newLayer: {
            _id: 'test_id',
            JC_Id: null,
            JCFields: {},
            JCFormat: null,
            JCGeoType: null,
            JCName: 'jcname',
            JCSymbolStyle: null,
            JCSymbolType: null,
            JCARGB: null,
            JCLayerClassId: null,
            JCSize: null,
            JCFeatures: [],
        },
    }

    onCreateJCLayer = (layer) => {
        const {dispatch, onCreateJCLayer} = this.props;
        onCreateJCLayer(layer);
        dispatch(closeModal());
    }

    onDeleteJCLayer = (JCLayerID) => {
        const {dispatch, onDeleteJCLayer} = this.props;
        dispatch(showModal({
            type: 'confirm',
            content: '确认删除layer',
            onConfirm: () => {
                onDeleteJCLayer(JCLayerID);
            },
        }));
    }

    handleAddLayerClick = () => {
        const {dispatch} = this.props;
        dispatch(showModal({
            type: 'modal',
            title: '新建layer',
            content: this.renderNewLayer(),
        }));
    }

    renderNewLayer = () => {
        return (
            <FormCreator
                data={this.props.newLayer}
                onCreate={this.onCreateJCLayer}
                />
        );
    }

    renderLayer = (layer, index) => {
        const {onSaveJCLayer} = this.props;
        return (
            <AccordionItem key={index} title={layer.JCName}>
                <div className="card-block">
                    <FormEditor
                        data={layer}
                        onSave={onSaveJCLayer}
                        onDelete={this.onDeleteJCLayer}
                        />
                </div>
            </AccordionItem>
        );
    }

    render() {
        const {layers} = this.props;
        return (
            <div>
                <div className="margin-bottom">
                    <a className="btn btn-primary" onClick={this.handleAddLayerClick}>新建layer</a>
                </div>

                <div className="margin-bottom">
                    {layers.map(this.renderLayer)}
                </div>
            </div>
        );
    }
}

export default JCLayers;
