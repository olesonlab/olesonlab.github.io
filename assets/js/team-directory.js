(() => {
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

    const item = document.createElement('li');
    item.append(link);
    cards.append(item);
  }

  if (!cards.childElementCount) return;
  list.append(cards);
  directory.hidden = false;
})();
