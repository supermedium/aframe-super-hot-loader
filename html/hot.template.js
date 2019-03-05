const html = `{{- html|safe -}}`;

// Initial inject HTML into document. Only run once.
document.addEventListener('DOMContentLoaded', append);

function append () {
  let container = document.getElementById('app');
  if (!container) {
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
  }
  container.innerHTML = html;
}

if (module.hot) {
  const DiffDom = require('diff-dom').DiffDOM;

  module.hot.accept();

  // HTML changed, diff.
  if (module.hot.data && module.hot.data.oldHtml) {
    const oldHtml = module.hot.data.oldHtml;
    const diffdom = new DiffDom();

    const oldScene = document.createElement('div');
    oldScene.innerHTML = oldHtml;

    const newScene = document.createElement('div');
    newScene.innerHTML = html;

    const diff = diffdom.diff(oldScene, newScene);
    diffdom.apply(document.getElementById('app'), diff);
  }

  // Store HTML for next module to diff.
  module.hot.dispose(data => {
    data.oldHtml = html;
  });
}
