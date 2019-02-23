## aframe-super-hot-loader

[aframe]: https://aframe.io
[hmr]: https://webpack.js.org/concepts/hot-module-replacement/

Webpack loader for enabling [Hot Module Replacement][hmr] on [A-Frame][aframe]
components and shaders. Live reload components and shaders without refreshing
the page.

### Usage

```
npm install --save aframe-super-hot-loader
```

Then in your Webpack config:

```
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: path => path.indexOf('node_modules') !== -1,
        use: ['aframe-super-hot-loader']
      }
    ]
  }
  // ...
}
```

[wds]: https://webpack.js.org/configuration/dev-server/

Then run [webpack-dev-server][wds] with `hot` enabled:

```
webpack-dev-server --hot --inline
```

or in your Webpack config:

```
module.exports = {
  devServer: {
    hot: true
  }
};
```
