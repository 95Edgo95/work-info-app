const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");

module.exports = {
  entry: ['babel-polyfill', "./dist"],
  output: {
    chunkFilename: "js/[name]-chunk_[chunkhash].js",
    filename: `js/[name]_[chunkhash].js`,
    path: __dirname + "/public",
    publicPath: "/static"
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "dist/components"),
      containers: path.resolve(__dirname, "dist/containers"),
      services: path.resolve(__dirname, "dist/services"),
      helpers: path.resolve(__dirname, "dist/helpers"),
      modules: path.resolve(__dirname, "dist/modules"),
      configs: path.resolve(__dirname, "dist/configs"),
      store: path.resolve(__dirname, "dist/store"),
      assets: path.resolve(__dirname, "./assets"),
      HOCs: path.resolve(__dirname, "dist/HOCs")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"]
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`,
              },
            },
          },
        ],
      },
      { test: /\.icon\.svg$/, loader: 'inline-loader' },
      {
        test: /((^(?!.*\.icon\.svg).*svg.*$)|(\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|txt)$))/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            context: path.resolve(__dirname, 'src'),
            outputPath: '/images',
          },
        }],
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          filename: 'libs.js',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    sideEffects: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
};
