var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: './js/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    devServer: { //DevServer相关的配置
        compress: true,
        port: 8888,
        inline: true,
        open: true,
        overlay: true,
        hot: true,
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
            }, {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [
                        // require('autoprefixer')(),
                        require('postcss-cssnext')(),
                        require('cssnano')(),
                        require('postcss-sprites')()
                    ]
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
        }, {
            test: /\.jpg|\.png|\.jpeg$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './img',
                    publicPath: '/img'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + "/img",
            to: __dirname + "/dist/img"
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}