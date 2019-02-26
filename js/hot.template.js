if (module.hot) {
  const componentNames = [
    {%- for component in componentNames -%}
      '{{ component }}',
    {%- endfor -%}
  ];

  const shaderNames = [
    {%- for shader in shaderNames -%}
      '{{ shader }}',
    {%- endfor -%}
  ];

  module.hot.accept();

  // Clean up from application when module is unloaded.
  module.hot.dispose(() => {
    let els;

    componentNames.forEach(component => {
      // Unregister.
      delete AFRAME.components[component];
      const els = AFRAME.scenes[0].querySelectorAll(`[${component}]`);
      for (let i = 0; i < els.length; i++) {
        if (!els[i].isEntity) { continue; }
        // Store data.
        els[i].dataset[`__hot__${component}`] = JSON.stringify(
          els[i].getDOMAttribute(component));
        // Detach component.
        els[i].removeAttribute(component);
      }
    });

    shaderNames.forEach(shader => {
      // Unregister.
      delete AFRAME.shaders[shader];
      const els = AFRAME.scenes[0].querySelectorAll(`[material]`);
      for (let i = 0; i < els.length; i++) {
        if (!els[i].isEntity) { continue; }
        // Store data.
        if (els[i].getAttribute('material').shader !== shader) { continue; }
        els[i].dataset['__hot__material'] = JSON.stringify(
          els[i].getDOMAttribute('material'));
        // Detach material.
        els[i].removeAttribute('material');
      }
    });
  });

  module.hot.addStatusHandler(status => {
    if (module.hot.status() !== 'ready') { return; }

    // Called after module is reloaded.
    module.hot.apply().then(() => {
      // Apply component back to entities.
      componentNames.forEach(componentName => {
        const dataName = `__hot__${componentName}`;
        const els = document.querySelectorAll(`[data-${dataName}]`);
        for (let i = 0; i < els.length; i++) {
          els[i].setAttribute(componentName, JSON.parse(els[i].dataset[dataName]));
          els[i].removeAttribute(`data-${dataName}`);
        }
      });

      // Apply materials back.
      componentNames.forEach(componentName => {
        const els = document.querySelectorAll(`[data-__hot__material]`);
        for (let i = 0; i < els.length; i++) {
          els[i].setAttribute('material', JSON.parse(els[i].dataset['__hot__material']));
          els[i].removeAttribute(`data-__hot__material`);
        }
      });
    });
  });
}
