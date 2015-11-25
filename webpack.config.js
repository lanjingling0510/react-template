/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var postcssImport = require('postcss-import');
var postNested = require('postcss-nested');
var postMixins = require('postcss-mixins');
var cssnext = require('cssnext');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

process.env.BABEL_ENV = TARGET;

var common = {
    entry: APP_PATH,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss'],
                include: APP_PATH
            }, {
                test: /\.js?$/,
                loaders: ['babel'],
                include: APP_PATH
            },
            {test: /\.(png|jpg)$/, loader: 'url?limit=25000'},
            {test: /\.(ttf|eot|svg|otf)(\?v=\d(\.\d){2})?$/, loader: 'file'},
            {test: /\.woff(2)?(\?v=\d(\.\d){2})?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
            {test: /\.json$/, loader: 'json'}
        ]
    },
    postcss: function () {
        return [
            postcssImport({
                onImport: function (files) {
                    files.forEach(this.addDependency);
                }.bind(this),
            }),
            cssnext({
                features: {
                    'browers': ['last 2 version'],
                },
            }),
            postMixins,
            postNested
        ];
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devTool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            //host: '192.168.88.122'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Kanban app'
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Kanban app'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
                mangle: {screw_ie8: true, keep_fnames: true}
            })
        ]
    });
}
