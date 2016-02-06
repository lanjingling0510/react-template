import React, { PropTypes, Component } from 'react';
import {Tabs, Tab, TabList, TabPanel} from 'react-tabs';
import {connect} from 'react-redux';
import JCProfile from './JCProfile.js';
import JCLayers from './JCLayers.js';
import JCFeatures from './JCFeatures.js';
import {fetchJCProfile, editJCProfile} from '../../../actions/JCProfiles.js';
import {fetchJCLayersIfNeeded, editJCLayer, createJCLayer, deleteJCLayer} from '../../../actions/JCLayers.js';
import {fetchJCFeaturesIfNeed} from '../../../actions/JCFeatures.js';

class MapEditPage extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        profile: PropTypes.object,
        layers: PropTypes.arrayOf(PropTypes.object),
    }

    static defaultProps = {
        profile: {},
        layers: [],
    }

    componentDidMount = () => {
        const {dispatch, params} = this.props;
        dispatch(fetchJCProfile(params._id)).then((profile) => {
            dispatch(fetchJCLayersIfNeeded(profile));
        });
    }

    onSaveJCProfile = (profile) => {
        const {dispatch} = this.props;
        dispatch(editJCProfile(profile));
    }

    onSaveJCLayer = (layer) => {
        const {dispatch} = this.props;
        dispatch(editJCLayer(layer));
    }

    onCreateJCLayer = (profile) => {
        const {dispatch} = this.props;
        return (layer) => {
            dispatch(createJCLayer(layer, profile));
        };
    }

    onDeleteJCLayer = (layerID) => {
        const {dispatch} = this.props;
        dispatch(deleteJCLayer(layerID));
    }

    onSelectJCFeatures = (layer) => {
        const {dispatch} = this.props;
        return dispatch(fetchJCFeaturesIfNeed(layer));
    }

    onSaveJCFeature = () => {
    }

    onDeleteJCFeature = () => {
    }

    renderTabs = () => {
        const {profile, layers, dispatch} = this.props;
        return (
            <Tabs forceRenderTabPanel={Boolean(false)}>
                <TabList>
                    <Tab>profile</Tab>
                    <Tab>layer</Tab>
                    <Tab>feature</Tab>
                </TabList>
                <TabPanel>
                    <JCProfile
                        profile={profile}
                        onSaveJCProfile={this.onSaveJCProfile}
                        />
                </TabPanel>
                <TabPanel>
                    <JCLayers
                        layers={layers}
                        dispatch={dispatch}
                        onSaveJCLayer={this.onSaveJCLayer}
                        onCreateJCLayer={this.onCreateJCLayer(profile)}
                        onDeleteJCLayer={this.onDeleteJCLayer}
                         />
                </TabPanel>
                <TabPanel>
                    <JCFeatures
                        layers={layers}
                        onSelectJCFeatures={this.onSelectJCFeatures}
                        onSaveJCFeature={this.onSaveJCFeature}
                        onDeleteJCFeature={this.onDeleteJCFeature}
                        />
                </TabPanel>
            </Tabs>
        );
    }

    render() {
        return (
            <div className="main-container">
                <div className="main-container-left">
                    {this.renderTabs()}
                </div>
                <div className="main-container-right" style={{background: 'rgb(226, 174, 139)'}}></div>
            </div>
        );
    }
}

function selectCurrentJCProfile(state) {
    const profile = state.JCProfiles.find(Profile => Profile._id === state.currentJCProfile);
    const layers = state.JCLayers.filter(layer => profile.JCLayers.includes(layer._id));
    return {profile, layers};
}

export default connect(selectCurrentJCProfile)(MapEditPage);
