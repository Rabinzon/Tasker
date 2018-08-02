import path from 'path';
import webpack from 'webpack';

const mode = (process.env.NODE_ENV === 'test' && 'development') || process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'main.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /(\.js)(\.scss)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // Popper: ['popper.js', 'default'],
    }),
  ],
};
