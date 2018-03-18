const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const manifestPulgin = require('webpack-manifest-plugin')
const dev = process.env.NODE_ENV === "development"

let cssLoaders = [
  {
    loader: 'css-loader',
    options: { importLoaders: 1, minimize: true }
  }
]

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: (loader) => [
            require('autoprefixer')({
              browsers: ['last 2 versions', 'ie > 9']
            }),
          ]
        }
      })
}

let config = {
  entry: {
    app: './src/js/app.js',
  },
  watch: true,
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoaders]
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoaders, 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new extractTextPlugin ({
      filename: dev ? '[name].css' : '[name].[contenthash:8].css',
      disable: dev
    }),
    new manifestPulgin ()
  ]
}

module.exports = config
