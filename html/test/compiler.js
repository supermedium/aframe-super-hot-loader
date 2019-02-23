const path = require('path');
const memoryfs = require('memory-fs');
const webpack = require('webpack');

module.exports = (fixture, options) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.html/,
        use: {
          loader: path.resolve(__dirname, '../index.js')
        }
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err);

      resolve(stats);
    });
  });
};
