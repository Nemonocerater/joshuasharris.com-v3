const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * Webpack
 * https://webpack.js.org/guides/getting-started/
 * https://medium.com/ag-grid/webpack-tutorial-understanding-how-it-works-f73dfa164f01
 *
 * Webpack - Babel - React
 * https://www.valentinog.com/blog/react-webpack-babel/
 */
module.exports = {
  // These are actually the default values for webpack entry and output
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'main.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Test App'
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ],
  },

  // This sets up webpack-dev-server
  devServer: {
    port: 8080,
    // Make all non found paths fall back to "/"
    // https://jaketrent.com/post/pushstate-webpack-dev-server/
    historyApiFallback: true
  }
};
