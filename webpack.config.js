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
                        require('cssnano')()
                    ]
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {

                        loader: 'url-loader',
                        options: { limit: 10000 }
                    },
                    {
                      loader: "image-webpack-loader",
                      options: {
                        mozjpeg: { progressive: true, quality: 65 },
                        optipng: { enabled: false },
                        pngquant: { quality: [0.65, 0.9], speed: 4 },
                        gifsicle: { interlaced: false },
                        webp: { quality: 75 }
                      }
                    }
            ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|mp3)$/,
          use: ["file-loader"]
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