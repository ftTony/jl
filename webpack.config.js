var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const PurifyCssPlugin = require('purifycss-webpack')
module.exports = {
    entry: './js/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '//cdn.xiaowuzi.info/'
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
        // new PurifyCssPlugin ({
        //     paths: glob.sync(path.join(__dirname, '/*.html'))
        // }),
        new ParallelUglifyPlugin({
            sourceMap: true,
            exclude: /node_modules/,
            workerCount: 5,
            // 传递给 uglifyES的参数
            uglifyES: {
                output: {
                    beautify: false,
                    comments: false
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        }),
        new OptimizeCSSAssetsPlugin ({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.(sa|sc|c)ss$/g, 
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),
           
            cssProcessorPluginOptions: {
                preset: [
                    'default', {
                  discardComments: { removeAll: true}, //对注释的处理
                  normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
              }]
            },
            canPrint: true  // 是否打印编译过程中的日志
          }),
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