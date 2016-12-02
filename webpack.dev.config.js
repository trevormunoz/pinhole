const webpack = require('webpack');
const path = require('path');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

const options = {
  entry: [
    './src/js/main.js'
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, "dist")
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    colors: true,
    quiet: true,
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  resolve: {
    modulesDirectories: ['node_modules', 'vendor'],
    extensions: ['', '.js', '.json', '.css']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: ['src'],
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['babel-preset-es2015', 'babel-preset-react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: "file-loader?name=images/[name].[ext]"
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
    new DashboardPlugin(dashboard.setData)
  ]
};

module.exports = options;
