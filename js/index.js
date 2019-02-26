const Nunjucks = require('nunjucks');

const whitespace = '[\\s\\n]*';
const string = `["'\`](.*?)["'\`]`;
const componentRegex = new RegExp(
  `registerComponent${whitespace}\\(${whitespace}${string}`,
  'g');
const shaderRegex = new RegExp(
  `registerShader${whitespace}\\(${whitespace}${string}`,
  'g');
const systemRegex = new RegExp(
  `registerSystem${whitespace}\\(${whitespace}${string}`,
  'g');

const nunjucks = Nunjucks.configure(__dirname, {noCache: true});

module.exports = function (source) {
  const componentNames = getComponentNames(source);
  const shaderNames = getShaderNames(source);
  const systemNames = getSystemNames(source);

  if (!componentNames.length && !shaderNames.length && !systemNames.length) {
    return source;
  }

  return source + nunjucks.render('hot.template.js', {
    componentNames: componentNames,
    shaderNames: shaderNames,
    systemNames: systemNames
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

function getSystemNames (source) {
  const systemNames = [];
  let match = null
  while (match = systemRegex.exec(source)) {
    systemNames.push(match[1]);
  }
  return systemNames;
}
