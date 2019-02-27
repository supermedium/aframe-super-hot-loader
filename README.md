## aframe-super-hot-loader

[aframe]: https://aframe.io
[hmr]: https://webpack.js.org/concepts/hot-module-replacement/

Webpack loaders for enabling [Hot Module Replacement][hmr] on [A-Frame][aframe]
HTML, components, and shaders.

Live reload A-Frame, components, and shaders. Never refresh the page during
development again!

**[Watch Video](https://youtu.be/uh_RQay3x80)**

### Usage

#### Installation

```
npm install --save aframe-super-hot-loader
npm install --save aframe-super-hot-html-loader
```

#### Webpack Config

There are two separate Webpack loaders, one for JS and one for HTML. In your
Webpack config:

```js
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

#### Dev Server

Then run [webpack-dev-server][wds] with `hot` enabled:

```
webpack-dev-server --hot --inline
```

or in your Webpack config:

```js
module.exports = {
  devServer: {
    hot: true
  }
};
```

#### Requiring

For the HTML loader, you'll need to require an HTML file through Webpack that contains your scene, which will be injected into your index.html.

```js
// index.js
require('./scene.html');
```

And an example HTML file:

```html
<!-- index.html -->
<html>
  <head>
    <script src="build/build.js"></script>
  </head>
  <body>
    <!-- require('./scene.html') will be injected here from the JS build. -->
  </body>
</html>
```

### Boilerplate Example

There's a boilerplate example in the `examples/` directory:

```
cd examples
npm install
npm run start
```

Then try it out by modifying files. If you'd like to incorporate into your own
project, you can start from that boilerplate base and / or absorb the Webpack
configuration.
