AFRAME.registerShader('noise', {
  schema: {
    time: {type: 'time', is: 'uniform'},
    color: {type: 'color', is: 'uniform', default: 'red'},
    weight: {type: 'number', default: 1.0, is: 'uniform'}
  },

  vertexShader: require('./shaders/noise.vert.glsl'),

  fragmentShader: require('./shaders/noise.frag.glsl')
});
