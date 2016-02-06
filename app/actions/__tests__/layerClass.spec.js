import configureMockStore from 'redux-mock-store';
import thunkFetchMiddleware from '../../utils/thunkFetchMiddleware.js';
import nock from 'nock';
import {
    fetchLayerClassesIfNeeded,
    RECEIVE_LAYER_CLASSES,
    REQUEST_LAYER_CLASSES,
}
from '../layerClass.js';

const middlewares = [thunkFetchMiddleware];
const mockStore = configureMockStore(middlewares);

describe('layerClass', () => {
    afterEach(() => {
        nock.cleanAll();
    })

    it('fetching layerClasses', (done) => {
        nock('https://apis.aliyun183.jcbel.com/')
            .get('/jims/1/layer-classes')
            .reply(200, [])

        const expectedActions = [
            {
                type: REQUEST_LAYER_CLASSES,
                querystring: 'querystring',
            },
            {
                type: RECEIVE_LAYER_CLASSES,
                layerClasses: [],
            }
        ];

        const store = mockStore({
            layerClasses: [],
            auth: {
                accessToken: 'xxx',
            },
        }, expectedActions, done);

        store.dispatch(fetchLayerClassesIfNeeded('querystring'));
    })
})
