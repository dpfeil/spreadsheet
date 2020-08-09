const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src/browser'),
    devtool: 'inline-source-map',
    entry: './index.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'static/js')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};