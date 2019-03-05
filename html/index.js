const Nunjucks = require('nunjucks');
const path = require('path');

const nunjucks = Nunjucks.configure(__dirname, {noCache: true});

module.exports = function (source) {
  return nunjucks.render('hot.template.js', {html: source});
};
