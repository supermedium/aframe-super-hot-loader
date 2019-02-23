require('./compiler')('index.html').then(result => {
  console.log(result);
}).catch(console.error);
