const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/build'
    },
    devServer: { // настройки webpack-dev-server
        contentBase: path.join(__dirname, '/'),
        compress: true,
        stats: 'errors-only'
    },
    devtool : 'eval',
    plugins: [
        new HtmlWebpackPlugin({ // плагин для  генерацияя шаблона в /build/
            title: 'Test',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './src/index.html',
        }),
        new ExtractTextPlugin({ // плагин для генерации отдельного .css файла в /build/
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            // проверка ESLint при каждой сборке
            { 
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '/build'
                })
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=images/', // размещение изображений в /build/images
                    'image-webpack-loader' // оптимизация изображений
                ]
            }
        ]
    },

};