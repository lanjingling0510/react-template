import {combineReducers} from 'redux';
import {auth} from './auth.js';
import {modal} from './modal.js';
import {fetcheds} from './fetcheds.js';
import {JCProfiles, currentJCProfile} from './JCProfiles.js';
import {JCLayers} from './JCLayers.js';
import {JCFeatures} from './JCFeatures.js';
import {users, currentUser} from './users.js';
import {routeReducer} from 'redux-simple-router';
import {layerClasses} from './layerClass.js';


const rootReducer = combineReducers({
    routing: routeReducer,
    auth,
    modal,
    fetcheds,
    JCProfiles,
    currentJCProfile,
    JCLayers,
    JCFeatures,
    users,
    currentUser,
    layerClasses,
});

export default rootReducer;
