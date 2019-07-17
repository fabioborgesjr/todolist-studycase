const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: '.\\src\\js\\main.jsx',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            beautify: false,
            comments: false,
            test: /\.js(\?.*)?$/i,
        }),
        new webpack.DefinePlugin({
            'process.env.USE_FILTER': JSON.stringify(process.env.USE_FILTER || 'false')
        })
    ],
    module: {
        loaders: [{
                loader: 'babel-loader',
                test: /.js[x]?$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-object-rest-spread'],
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', { minimize: true }),
                loader: ExtractTextPlugin.extract('css-loader', { minimize: true })
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
                loader: 'file'
            }
        ]
    }
};