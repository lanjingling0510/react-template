/* 模拟的数据 */

// JCProfiles
export const profiles = [
    {
        _id: '0',
        JC_Id: 'jc_id1',
        JCAuthor: 'jcauthor',
        JCProjectName: 'jcprojectname',
        JCDescription: 'jcdescription',
        JCLayers: ['1', '2'],
    },
    {
        _id: '1',
        JC_Id: 'jc_id2',
        JCAuthor: 'jcauthor',
        JCProjectName: 'jcprojectname',
        JCDescription: 'jcdescription',
        JCLayers: [],
    },
];

// JCLayers
export const layers = [{
    _id: '1',
    JC_Id: '1',
    JCFields: {
        JCImage: 'TEXT',
        JCScale: 'DOUBLE',
        JCMax: 'DOUBLE',
        JCMin: 'DOUBLE',
        JCImgBytes: 'BLOB',
    },
    JCFormat: null,
    JCGeoType: 'polygon',
    JCName: 'base',
    JCSymbolStyle: 'TILE',
    JCSymbolType: null,
    JCARGB: 0,
    JCLayerClassId: 0,
    JCSize: 0,
    JCFeatures: ['1', '2'],

}, {
    _id: '2',
    JC_Id: '2',
    JCFields: {
        'num': 'INTEGER',
        'x': 'DOUBLE',
        'y': 'DOUBLE',
        'z': 'DOUBLE',
        'rsa': 'TEXT',
    },
    JCFormat: '$num',
    JCGeoType: 'point',
    JCName: 'beacon',
    JCSymbolStyle: 'CIRCLE',
    JCSymbolType: null,
    JCARGB: 0,
    JCLayerClassId: 0,
    JCSize: 5,
    JCFeatures: ['1'],
}];

// JCFeatures
export const features = [
    {
        _id: '1',
        JC_Id: '1',
        JCAuthor: null,
        JCFeatureType: 'polygon',
        JCGUID: '34968891-06c7-471b-9b75-81e5c86574ca',
        JCGeoData: '0.0,0.0 3948.0,0.0 3948.0,3000.0 0.0,3000.0 0.0,0.0',
        JCLayerName: 'base',
        JCModifier: null,
        JCState: 0,
        JCBack: '0.0',
        JCBottom: 3000,
        JCCreateTime: 0,
    }, {
        _id: '2',
        JC_Id: '2',
        JCAuthor: null,
        JCFeatureType: 'point',
        JCGUID: '34968891-06c7-471b-9b75-81e5c86574ca',
        JCGeoData: '0.0,0.0 3948.0,0.0 3948.0,3000.0 0.0,3000.0 0.0,0.0',
        JCLayerName: 'base',
        JCModifier: null,
        JCState: 0,
        JCBack: '0.0',
        JCBottom: 4000,
        JCCreateTime: 0,
    },
];

// users
export const users = [
    {
        _id: '1',
        username: 'chenytian',
        nickname: 'lan',
        phone: 1333333333,
        createdAt: '2015-4-3 30:20',
        createdPersion: 'me',
        mapAuth: 1,
        arAuth: 1,
    },
];
