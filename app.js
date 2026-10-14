const root = document.documentElement;
const themeButton = document.querySelector('#theme');
themeButton.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  root.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    let count = 0;
    document.querySelectorAll('.project').forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#filter-status').textContent = `${String(count).padStart(2, '0')} PROJECTS`;
  });
});

const projects = JSON.parse(document.querySelector('#portfolio-data').textContent);
const stories = Object.fromEntries(projects.map(project => [project.id, project]));

const storyDialog = document.querySelector('#story-dialog');
document.querySelectorAll('[data-story]').forEach(button => {
  button.addEventListener('click', () => {
    const story = stories[button.dataset.story];
    document.querySelector('#dialog-label').textContent = `${story.name} / ${story.domain}`;
    document.querySelector('#dialog-title').textContent = story.headline;
    document.querySelector('#dialog-public').href = `https://luca.ooo/#project-${story.id}`;
    const body = document.querySelector('#dialog-body');
    body.replaceChildren(...[story.summary, story.why, story.detail].map(text => {
      const p = document.createElement('p'); p.textContent = text; return p;
    }));
    const flow = document.querySelector('#dialog-links');
    flow.replaceChildren(...story.flow.map((step,index) => {
      const item = document.createElement('span');
      item.className = 'workflow-step';
      item.textContent = `${index+1}. ${step}`;
      return item;
    }));
    storyDialog.showModal();
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});

document.querySelectorAll('.project-jump').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('[data-filter="all"]').click();
  });
});
