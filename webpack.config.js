const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

// const devBuild = process.env.NODE_ENV !== 'production'
// const nodeEnv = devBuild ? 'development' : 'production'
const devBuild = process.env.NODE_ENV === 'development'
const nodeEnv = devBuild ? 'development' : 'production'
const apiHost = 'http://localhost:1337'

const config = {
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './client/index.js',
  ],

  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve('dist'),
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      images: path.resolve('./client/assets/images')
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
        API_HOST: JSON.stringify(apiHost)
      },
    }), HtmlWebpackPluginConfig
  ],
  module: {
    loaders: [{
      exclude: [/node_modules/, /images/]
    }],
    rules: [{
      test: require.resolve('react'),
      loader: 'imports-loader?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?url=false!sass-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }]
  },
  devServer: {
    historyApiFallback: true
  }
}

module.exports = config
config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: {
      comments: false
    },
    sourceMap: false,
    mangle: false
  })
)
