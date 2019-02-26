function requireAll (req) { req.keys().forEach(req); }

// Require all components.
requireAll(require.context('./components/', true, /\.js$/));

require('aframe-particle-system-component');
require('./scene.html');
