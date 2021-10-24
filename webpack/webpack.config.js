const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

const browserConfig = {
  name: 'client',
  target: 'web',
  entry: {
    main: path.join(process.cwd(), 'client/index.tsx'),
  },
  output: {
    path: path.join(process.cwd(), 'public/client_dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  devtool: false,
  mode: process.env.NODE_ENV || 'development',
  watch: isDev,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.module\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              import: false,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /client_dist/, /server_dist/],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? 'main.css' : '[contenthash].css',
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), 'public/client_dist/main.html'),
      template: path.join(process.cwd(), 'client/main.html'),
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
    }),
  ],
  
  optimization: {
    minimize: !isDev,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
        },
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
  },
  
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: ['node_modules'],
    },
};

const serverConfig = {
  name: 'server',
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV === 'development',
  entry: {
    server: path.join(process.cwd(), 'server/server.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), 'public/server_dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /client_dist/, /server_dist/],
        loader: 'ts-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'ignore-loader',
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },
};

module.exports = [browserConfig];
