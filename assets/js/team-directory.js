(() => {
  const platforms = [
    { name: 'Google Scholar', icon: 'bi-mortarboard-fill', matches: (url) => url.hostname === 'scholar.google.com' && url.pathname === '/citations' && Boolean(url.searchParams.get('user')) },
    { name: 'GitHub', icon: 'bi-github', matches: (url) => url.hostname === 'github.com' && /^\/[\w-]+\/?$/.test(url.pathname) },
    { name: 'LinkedIn', icon: 'bi-linkedin', matches: (url) => /^(?:www\.)?linkedin\.com$/.test(url.hostname) && /^\/in\/[^/]+\/?$/.test(url.pathname) },
  ];

  function addProfileIcons(heading, memberName) {
    const links = [...heading.parentElement.querySelectorAll('a[href^="https://"]')];
    const icons = document.createElement('div');
    icons.className = 'team-member-links';

    for (const { name, icon, matches } of platforms) {
      const source = links.find((link) => matches(new URL(link.href)));
      if (!source) continue;

      const link = document.createElement('a');
      link.href = source.href;
      link.title = name;
      link.setAttribute('aria-label', `${memberName} on ${name}`);

      const glyph = document.createElement('i');
      glyph.className = `bi ${icon}`;
      glyph.setAttribute('aria-hidden', 'true');
      link.append(glyph);
      icons.append(link);
    }

    if (!icons.childElementCount) return;
    const title = document.createElement('div');
    title.className = 'team-member-heading';
    heading.before(title);
    title.append(heading, icons);
  }

  const directory = document.querySelector('.team-directory');
  const list = directory?.querySelector('.team-directory-grid');
  if (!list) return;

  const cards = document.createDocumentFragment();
  for (const section of document.querySelectorAll('main > section.about[id]')) {
    const heading = section.querySelector('.content > h2');
    const bio = heading?.closest('.row');
    const portrait = section.querySelector('.team-portrait-frame, .team-portrait');
    if (!heading || !bio || !portrait) continue;

    bio.id ||= `team-bio-${section.id.replaceAll('.', '-')}`;
    bio.classList.add('team-bio-anchor');
    bio.tabIndex = -1;

    const link = document.createElement('a');
    link.href = `#${bio.id}`;
    link.className = 'team-directory-link';
    link.dataset.portraitMember = section.id;

    const image = portrait.cloneNode(true);
    image.setAttribute('aria-hidden', 'true');
    const photo = image.matches('img') ? image : image.querySelector('img');
    if (photo) {
      photo.alt = '';
      photo.loading = 'lazy';
      photo.decoding = 'async';
    }

    const name = document.createElement('span');
    name.textContent = heading.textContent.trim();
    link.append(image, name);
    addProfileIcons(heading, name.textContent);

    const item = document.createElement('li');
    item.append(link);
    cards.append(item);
  }

  if (!cards.childElementCount) return;
  list.append(cards);
  directory.hidden = false;
})();
