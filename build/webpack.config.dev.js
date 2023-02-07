const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "../src/index.jsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js",
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
            {
                test: /\.tsx?$/,

                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf|png|gif|jpg|jpeg)(\?.*)?$/,
                loader: "file-loader",
            },
        ],
    },

    resolve: {
        extensions: [
            ".js",
            ".json",
            ".jsx",
            ".ts",
            ".tsx",
            ".css",
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
        ],
    },

    devtool: "source-map",
    context: __dirname,
    target: "web",
    devServer: {
        compress: false,
        historyApiFallback: false,
        hot: true,
    },

    plugins: [new HtmlWebpackPlugin({template: '../src/index.html'})],
};
