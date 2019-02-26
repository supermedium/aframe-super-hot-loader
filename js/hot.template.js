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

  const systemNames = [
    {%- for system in systemNames -%}
      '{{ system }}',
    {%- endfor -%}
  ];

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
        els[i].setAttribute(`data-__hot-${component}`,
                            JSON.stringify(els[i].getDOMAttribute(component)));
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
        els[i].setAttribute('data-__hot-material', JSON.stringify(
          els[i].getDOMAttribute('material')));
        // Detach material.
        els[i].removeAttribute('material');
      }
    });

    systemNames.forEach(system=> {
      delete AFRAME.systems[system];
      delete AFRAME.scenes[0].systems[system];
    });
  });

  module.hot.addStatusHandler(status => {
    if (module.hot.status() !== 'ready') { return; }

    // Called after module is reloaded.
    module.hot.apply().then(() => {
      // Apply component back to entities.
      componentNames.forEach(componentName => {
        const dataAttrName = `data-__hot-${componentName}`;
        const els = document.querySelectorAll(`[${dataAttrName}]`);
        for (let i = 0; i < els.length; i++) {
          els[i].setAttribute(componentName, JSON.parse(els[i].getAttribute(dataAttrName)));
          els[i].removeAttribute(dataAttrName);
        }
      });

      // Apply materials back.
      componentNames.forEach(componentName => {
        const dataAttrName = 'data-__hot-material';
        const els = document.querySelectorAll(`[${dataAttrName}]`);
        for (let i = 0; i < els.length; i++) {
          els[i].setAttribute('material', JSON.parse(els[i].getAttribute(dataAttrName)));
          els[i].removeAttribute(dataAttrName);
        }
      });
    });
  });

  module.hot.accept();
}
