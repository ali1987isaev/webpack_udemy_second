const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/dashboard.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9000/',
  },
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    devMiddleware: {
      index: 'dashboard.html',
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      title: 'Dashboard',
    }),
    new ModuleFederationPlugin({
      name: 'App',
      remotes: {
        HelloApp: 'HelloApp@http://localhost:9001/remoteEntry.js',
        ImageApp: 'ImageApp@http://localhost:9002/remoteEntry.js',
      }
    })
  ]
}