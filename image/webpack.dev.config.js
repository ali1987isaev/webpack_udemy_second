const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/image.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9002/',
  },
  mode: 'development',
  devServer: {
    port: 9002,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    devMiddleware: {
      index: 'image.html',
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024
          }
        }
      },
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
      filename: 'image.html',
      title: 'Image Webpack App',
      template: 'src/page-template.hbs',
      description: 'Some image description',
    }),
    new ModuleFederationPlugin({
      name: 'ImageApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ImageNewPage': './src/components/image-new-page/image-new-page.js',
      }
      // remotes: {
      //   HelloApp: 'HelloApp@http://localhost:9001/remoteEntry.js'
      // }
    })
  ]
}