const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './server/server'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  externals: [nodeExternals({
    whitelist: [
      /^"@angular\/material"/
    ]
  })],
  node: {
    __dirname: true
  },
  output: {
    path: __dirname + '/server',
    filename: 'prod.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};
