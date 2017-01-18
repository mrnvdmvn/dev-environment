import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtrachTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname,'src/vendor'),
    main: path.resolve(__dirname,'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js' //simulate existing bundle in src dir
  },
  plugins: [
    //generate an external css file with a hash in filename
    new ExtrachTextPlugin('[name].[contenthash].css'),

    //hash the files using MD5 so that their names change
    //when the content changes
    new WebpackMd5Hash(),

    //use commonschunkplugin to create a separate bundle
    //of vendor librarites so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),

    //create html file that includes reference to bundled.js
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject:true
    }),

    //eliminate duplicate packages when generating bundling
    new webpack.optimize.DedupePlugin(),

    //minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders:ExtrachTextPlugin.extract('css?sourceMap')}
    ]
  }
}
