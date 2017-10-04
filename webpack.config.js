module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }, 
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_module/,
      loader: 'babel-loader',
      query: {
        presets: [ 'env', 'react' ]
      }
    }]
  }
}