const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: path.join(__dirname, '/src/App.js'),
    output: {
        path: path.join(__dirname, '/public/build'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                //exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
}