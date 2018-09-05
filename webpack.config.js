const path = require('path');

// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
  entry: {
    'empty-widget': path.join(__dirname, './src/empty-widget/empty-widget')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'empty-widget.css'
    })
  ],
  module: {
    rules: [
      ...ringUiWebpackConfig.config.module.rules,
      {
        test: /\.*css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:7]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }]
  },
  resolve: {
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    '@jetbrains/ring-ui': {
      commonjs: '@jetbrains/ring-ui',
      commonjs2: '@jetbrains/ring-ui'
    }
  }
};
