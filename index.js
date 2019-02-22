const whitespace = '[\\s\\n]*';
const string = `["'\`](.*?)["'\`]`;
const componentRegex = new RegExp(
  `registerComponent${whitespace}\\(${whitespace}${string}`,
  'g');

function findEntry (mod) {
  if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
    return findEntry(mod.reasons[0].module)
  }
  return mod.resource;
}

module.exports = function (source) {
  const componentNames = getComponentNames(source);

  if (!componentNames.length) { return source; }

  source += `
    if (module.hot) {
      module.hot.dispose(() => {
        let els;
  `;

  // Dispose.
  // Delete component from A-Frame's registry.
  // Store component data of all entities with that component.
  // Remove component from entities.
  componentNames.map(componentName => {
    source += `
      delete AFRAME.components['${componentName}'];
      els = document.querySelectorAll('[${componentName}]')
      for (let i = 0; i < els.length; i++) {
        els[i].dataset['__hot__${componentName}'] = JSON.stringify(els[i].getDOMAttribute('${componentName}'));
        els[i].removeAttribute('${componentName}');
      }
    `;
  });
  source += `});`;

  // Accept.
  // Get component data of all previous entities with that component.
  // Add component back to entities.
  source += `
    module.hot.accept('./', err => {
      if (err) { console.error(err); }
      let els;
  `;
  componentNames.map(componentName => {
    let dataName = `__hot__${componentName}`;
    source += `
      els = document.querySelectorAll('[data-${dataName}]');
      console.log(els);
      for (let i = 0; i < els.length; i++) {
        els[i].setAttribute('${componentName}', JSON.parse(els[i].dataset['${dataName}']));
        els[i].removeAttribute('data-${dataName}');
      }
    `;
  });
  source += '});'

  source += '}';  // Closing (if (module.hot)).

  return source;
}

function getComponentNames (source) {
  const componentNames = [];
  let match = null
  while (match = componentRegex.exec(source)) {
    componentNames.push(match[1]);
  }
  return componentNames;
}
module.exports.getComponentNames = getComponentNames;
