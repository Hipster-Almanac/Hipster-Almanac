const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    target: 'web',
    entry: './src/app.js',
    output: {
        path: '../server/public/',
        filename: 'build.js'
    }, 

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }), 
    ],

    module: {
        preLoaders: [{
            test: /\.js$/, // all files ending in .js
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            exclude:/node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
            } 

        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        }, 
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        }, 
        {
            test: /\.html/,
            loader: 'html-loader'
        }
        ]
    },
    sassLoader: {
        includePaths: ['./src/scss/partials']
    }
};