## aframe-super-hot-loader

[aframe]: https://aframe.io
[hmr]: https://webpack.js.org/concepts/hot-module-replacement/

Webpack loaders for enabling [Hot Module Replacement][hmr] on [A-Frame][aframe]
HTML, components, and shaders.

Live reload A-Frame, components, and shaders. Never refresh the page during
development again!

### Usage

```
npm install --save aframe-super-hot-loader
npm install --save aframe-super-hot-html-loader
```

There are two separate Webpack loaders, one for JS and one for HTML. In your
Webpack config:

```
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ['aframe-super-hot-loader']
      },
      {
        test: /\.html/,
        exclude: /(node_modules)/,
        use: ['aframe-super-hot-html-loader']
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
