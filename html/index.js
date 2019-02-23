const Nunjucks = require('nunjucks');

const nunjucks = Nunjucks.configure(__dirname, {noCache: true});

module.exports = function (source) {
  return nunjucks.render('hot.template.js', {html: source});
};
