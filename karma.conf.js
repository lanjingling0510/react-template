/*eslint-disable */
var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var postcssImport = require('postcss-import');
var postNested = require('postcss-nested');
var postMixins = require('postcss-mixins');
var cssnext = require('cssnext');

module.exports = function (config) {
    config.set({

        browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

        singleRun: false,

        autoWatch: true,

        frameworks: [ 'jasmine' ],

        files: [
            'tests.webpack.js'
        ],

        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },

        reporters: [ 'dots' ],

        webpack: {
            devtool: 'inline-source-map',
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
        },

        webpackServer: {
            noInfo: true
        }

    });
};

