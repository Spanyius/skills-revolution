(() => {
  const page = document.body.dataset.page || '';

  const venues = {
    c2022: {
      title: 'MOTORWORLD Region Stuttgart',
      subtitle: 'Graf-Zeppelin-Platz 1, 71034 Böblingen, Germany',
      query: 'MOTORWORLD Region Stuttgart Graf-Zeppelin-Platz 1 71034 Böblingen Germany'
    },
    c2024: {
      title: 'Brussels, Belgium',
      subtitle: 'Conference location in Brussels · archived edition',
      query: 'Brussels Belgium'
    },
    c2025: {
      title: 'VSB – Technical University of Ostrava',
      subtitle: '17. listopadu 2172/15, 708 00 Ostrava-Poruba, Czechia',
      query: 'VSB Technical University of Ostrava 17 listopadu 2172/15 Ostrava Czechia'
    },
    c2026: {
      title: 'HUB UTCN, Cluj-Napoca',
      subtitle: 'Str. G. Barițiu nr. 4, Cluj-Napoca, Romania',
      query: 'HUB UTCN Strada George Barițiu 4 Cluj-Napoca Romania'
    }
  };

  function mapMarkup(venue) {
    const query = encodeURIComponent(venue.query);
    return `
      <section class="sr-section sr-section--white sr-map-section" aria-label="Conference location map">
        <div class="sr-container sr-grid sr-grid--2">
          <div>
            <span class="sr-kicker">Location</span>
            <h2>${venue.title}</h2>
            <p class="sr-lead">${venue.subtitle}</p>
            <div class="sr-actions">
              <a class="sr-btn sr-btn--secondary" href="https://www.google.com/maps/search/?api=1&query=${query}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            </div>
          </div>
          <div style="overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 12px 32px rgba(24,32,45,.08)">
            <iframe title="Google Map showing ${venue.title}" src="https://www.google.com/maps?q=${query}&output=embed" width="100%" height="380" style="border:0;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
          </div>
        </div>
      </section>`;
  }

  function addMap() {
    const venue = venues[page];
    const main = document.querySelector('main.sr-page');
    if (!venue || !main || main.querySelector('.sr-map-section')) return Boolean(main);

    const organisersTitle = main.querySelector('[id^="organisers-"]');
    const organisersSection = organisersTitle?.closest('.sr-section');
    const coverageTitle = main.querySelector('[id^="coverage-"]');
    const coverageSection = coverageTitle?.closest('.sr-section');
    const archiveTitle = main.querySelector('[id^="archive-nav-"]');
    const archiveSection = archiveTitle?.closest('.sr-section');

    const template = document.createElement('template');
    template.innerHTML = mapMarkup(venue).trim();
    const mapSection = template.content.firstElementChild;

    if (organisersSection) organisersSection.insertAdjacentElement('afterend', mapSection);
    else if (coverageSection) coverageSection.insertAdjacentElement('beforebegin', mapSection);
    else if (archiveSection) archiveSection.insertAdjacentElement('beforebegin', mapSection);
    else main.appendChild(mapSection);
    return true;
  }

  if (!addMap()) {
    const observer = new MutationObserver(() => {
      if (addMap()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
