require('./compiler')('component.js').then(result => {
  console.log(result);
}).catch(console.error);
