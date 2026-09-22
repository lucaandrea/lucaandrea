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
    document.querySelector('#filter-status').textContent = `${String(count).padStart(2, '0')} SELECTED STORIES`;
  });
});

const stories = {
  grid: {
    label: 'COMPANY BUILDING / GRID', title: 'A front door to company knowledge.',
    paragraphs: [
      'The starting point was information spread across Google Drives. Grid brings resources, an org chart, and AI-assisted answers into one employee hub.',
      'Replit has publicly showcased this work. The idea is simple: start with the actual friction a team experiences, then build a product around that workflow.',
      'The illustration in this draft is original concept artwork. It does not show company data or a live product screen.'
    ], links: [['See the public Replit showcase', 'https://www.linkedin.com/posts/luca-andrea_one-of-many-examples-of-whats-possible-when-activity-7468756111131582464-Y8Uq']]
  },
  desktop: {
    label: 'EXPLORING THE POSSIBLE / BROWSER DESKTOP', title: 'An idea worth pushing further.',
    paragraphs: [
      'I built a macOS-inspired web environment to explore how far natural-language software development could go with Replit Agent.',
      'The public walkthrough brings together a desktop, a code editor, a terminal, GitHub connectivity, and voice or text interactions in one browser-based environment.',
      'This is an independent experiment inspired by macOS, not an Apple product. The walkthrough is the source; the illustration here is a visual interpretation.'
    ], links: [['Watch the public walkthrough', 'https://www.linkedin.com/posts/luca-andrea_there-is-an-ongoing-debate-in-the-tech-community-activity-7434776130030600193-CMk7']]
  },
  studio: {
    label: 'THE PRACTICE / AI STUDIO', title: 'Build with the team. Keep it useful.',
    paragraphs: [
      'At Replit, I lead AI Studio and work with teams on software shaped around their own workflows. That spans knowledge, people, travel, creative work, revenue tools, and developer experience.',
      'The loop starts with understanding a problem and the data behind it. Build something tangible, let the team use it, and improve the direction that fits.',
      'Teaching, ownership, documentation, and maintenance belong in the product plan. The handoff matters as much as the first demo.'
    ], links: [['Explore Replit', 'https://replit.com']]
  },
  garage: {
    label: 'AFTER HOURS / THE GARAGE', title: 'Curiosity doesn’t clock out.',
    paragraphs: [
      'Away from company workflows, I explore automotive software, native apps, personal knowledge systems, and new ways to work with agents.',
      'My public GitHub is a mixture of experiments, adaptations, and forks. The Gran Turismo dashboard is based on community work by chrshdl; PhoneAgent and Open Deep Research are forks of projects by rounak and nickscamara.',
      'These are starting points for exploration, with credit to the original builders. A public repository is not a claim that I authored everything in it.'
    ], links: [['Open the public workbench', 'https://github.com/lucaandrea?tab=repositories']]
  }
};

const storyDialog = document.querySelector('#story-dialog');
document.querySelectorAll('[data-story]').forEach(button => {
  button.addEventListener('click', () => {
    const story = stories[button.dataset.story];
    document.querySelector('#dialog-label').textContent = story.label;
    document.querySelector('#dialog-title').textContent = story.title;
    const body = document.querySelector('#dialog-body');
    body.replaceChildren(...story.paragraphs.map(text => {
      const p = document.createElement('p'); p.textContent = text; return p;
    }));
    const links = document.querySelector('#dialog-links');
    links.replaceChildren(...story.links.map(([text, href]) => {
      const link = document.createElement('a');
      link.textContent = `${text} ↗`; link.href = href; link.target = '_blank'; link.rel = 'noreferrer';
      return link;
    }));
    storyDialog.showModal();
  });
});
document.querySelector('#preview-notes').addEventListener('click', () => document.querySelector('#notes-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
