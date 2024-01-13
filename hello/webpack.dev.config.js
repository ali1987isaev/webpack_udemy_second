const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/hello.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9001/',
  },
  mode: 'development',
  devServer: {
    port: 9001,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    devMiddleware: {
      index: 'hello.html',
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'hello.html',
      title: 'Hello Webpack App',
      template: 'src/page-template.hbs',
      description: 'Some hello description',
    }),
    new ModuleFederationPlugin({
      name: 'HelloApp',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloButton': './src/components/hello-button/hello-button.js',
        './HelloPage': './src/components/hello-page/hello-page.js'
      }
    }),
  ]
}