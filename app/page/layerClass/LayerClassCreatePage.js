import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createLayerClass, fetchLayerClassesIfNeeded} from '../../actions/layerClass.js';
import Selected from '../../components/Selected.js';
import {showModal} from '../../actions/modal.js';

class LayerClassCreatePage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        layerClasses: PropTypes.array,
    }

    static defaultProps = {
        layerClasses: [],
    }

    componentDidMount = () => {
        const {dispatch} = this.props;
        dispatch(fetchLayerClassesIfNeeded());
    }

    handleCreateLayerClassClick = () => {
        const {dispatch} = this.props;
        const refs = this.refs;
        const layerClass = {
            JCClassName: refs.JCClassName.value,
            parentId: refs.parentId.state.value,
        };
        dispatch(createLayerClass(layerClass)).then(() => {
            dispatch(showModal({
                type: 'success',
                content: '创建成功',
            }));
        });
    }

    render() {
        const {layerClasses} = this.props;
        const data = layerClasses.map(layerClass => {
            return {
                label: layerClass.JCClassName,
                value: layerClass._id,
            };
        });

        const selectedData = {
            data,
        };

        return (
            <div className="margin app-content">
                <div>
                    <div className="form center-block">
                            <div className="form-group">
                                <label className="form-label">类型名称</label>
                                <input ref="JCClassName"
                                    className="form-field-text form-field-sm field-primary"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">父LayerClass</label>
                                <Selected ref="parentId" {...selectedData} />
                            </div>
                            <div className="form-group row-justify-end">
                                <a className="btn btn-info"
                                    onClick={this.handleCreateLayerClassClick}
                                    >创建</a>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}


function selectlayerClasses(state) {
    return {layerClasses: state.layerClasses};
}

export default connect(selectlayerClasses)(LayerClassCreatePage);
