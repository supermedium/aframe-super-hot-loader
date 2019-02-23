const Nunjucks = require('nunjucks');

const whitespace = '[\\s\\n]*';
const string = `["'\`](.*?)["'\`]`;
const componentRegex = new RegExp(
  `registerComponent${whitespace}\\(${whitespace}${string}`,
  'g');
const shaderRegex = new RegExp(
  `registerShader${whitespace}\\(${whitespace}${string}`,
  'g');

const nunjucks = Nunjucks.configure(__dirname, {noCache: true});

module.exports = function (source) {
  const componentNames = getComponentNames(source);
  const shaderNames = getShaderNames(source);

  if (!componentNames.length && !shaderNames.length) { return source; }

  return source + nunjucks.render('hot.template.js', {
    componentNames: componentNames,
    shaderNames: shaderNames
  });
}

function getComponentNames (source) {
  const componentNames = [];
  let match = null
  while (match = componentRegex.exec(source)) {
    componentNames.push(match[1]);
  }
  return componentNames;
}

function getShaderNames (source) {
  const shaderNames = [];
  let match = null
  while (match = shaderRegex.exec(source)) {
    shaderNames.push(match[1]);
  }
  return shaderNames;
}
module.exports.getShaderNames = getShaderNames;
