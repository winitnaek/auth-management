const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const IndexGeneratorPlugin = require('./build/indexGeneratorPlugin');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: [
        APP_DIR + '/seca_index.js' // Your appʼs entry point
    ],
    output: {
        filename: 'secAdminBundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'] }

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: "/dist"
                })
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        },
                    },
                ]
            }
        ]
    },
    externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}',
        react: 'React',
        'react-dom': 'ReactDOM',
        redux: 'Redux',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        'prop-types': 'PropTypes'
    },
    resolve: {
        extensions: ['jsx', '.js', '.css']
    },
    plugins: [
        new webpack.EnvironmentPlugin(
            ['NODE_ENV',]),
        new CopyWebpackPlugin([
            { from: './index.html', to: '../dist/index.html' },
            { from: './login.html', to: '../dist/login.html' },
            { from: './templates.html', to: '../dist/templates.html' },
            { from: './manifest.json', to: '../dist/manifest.json' },
            {
                context: './res/css',
                from: '**/*',
                to: '../dist/res/css'
            },
            {
                context: './res/js',
                from: '**/*',
                to: '../dist/res/js'
            },
            { /* PDF.js web */
                context: './res/pdfjs/web',
                from: '**/*',
                to: '../dist/pdfjs/web'
            },
            { /* PDF.js build*/
                context: './res/pdfjs/build',
                from: '**/*',
                to: '../dist/pdfjs/build'
            },
            { /* Bootstrap */
                from: './res/js/bootstrap-4.3.1-dist/css/bootstrap.min.css',
                to: '../dist/Default.css'
              },
              ,{
                from: './res/css/signin.css',
                to: '../dist/signin.css'
              },
              {
                from: './check.js',
                to: '../dist/c.js'
              },
            {
                from: './index.js',
                to: '../dist/i.js'
              },
              {
                from: './utils.js',
                to: '../dist/u.js'
              },
              { /* Images */
                context: './res/app/img',
                from: '**/*',
                to: '../dist/app/img'
              },
              ,{
                from: './res/css/app.css',
                to: '../dist/app_Default.css'
              }
        ]),
        new CleanWebpackPlugin(['dist/*.*', 'dist/res', 'dist/src','dist/pdfjs']),
        new ExtractTextPlugin({ filename: 'secAdminBundle.css', allChunks: true }),
        new ProgressBarPlugin(),
        new IndexGeneratorPlugin()
    ]
};