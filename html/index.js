const getOptions = require('loader-utils').getOptions;
const Nunjucks = require('nunjucks');
const path = require('path');

const nunjucks = Nunjucks.configure(__dirname, {noCache: true});

// Previous loaders can store <includes>COMMA-SEPARATED PATHS<end-includes>
// to help Webpack detect changes (e.g, passed from super-nunjucks-loader).
const includesRegex = /<includes>(.*)?<end-includes>/;
const includeRootRegex = /<include-root>(.*)?<end-include-root>/;

module.exports = function (source) {
  let includeRoot = '';
  const includeRootMatch = includeRootRegex.exec(source);
  if (includeRootMatch) { includeRoot = includeRootMatch[1]; }

  if (includeRoot) {
    let includes = [];
    const includesMatch = includesRegex.exec(source);
    if (includesMatch) { includes = includesMatch[1].split(','); }

    if (includes.length) {
      includes.forEach(include => {
        this.addDependency(path.resolve(includeRoot, include));
      });
    }
  }

  return nunjucks.render('hot.template.js', {html: source});
};
