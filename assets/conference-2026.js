(() => {
  const ASSETS = '/skills-revolution/assets/';

  function ensureProgramme(root = document) {
    const title = root.querySelector('#agenda-2026-title');
    const agenda = title?.closest('.sr-section')?.querySelector('.sr-agenda');
    if (!agenda) return false;

    const existingDetails = agenda.closest('details.sr-programme-details');
    if (existingDetails) {
      existingDetails.removeAttribute('open');
      return true;
    }

    const container = agenda.parentElement;
    if (!container) return false;

    const summary = document.createElement('div');
    summary.className = 'sr-programme-summary';
    summary.setAttribute('aria-label', 'Programme highlights');
    summary.innerHTML = `
      <div class="sr-programme-summary__item"><span class="sr-programme-summary__label">Format</span><strong>Laboratory visit, conference day, showcases and networking</strong></div>
      <div class="sr-programme-summary__item"><span class="sr-programme-summary__label">Main themes</span><strong>Automotive + semiconductors, Union of Skills, Blueprint roll-out and regional practice</strong></div>
      <div class="sr-programme-summary__item"><span class="sr-programme-summary__label">Featured voices</span><strong>European Parliament, industry, SEMI Europe, ASA, universities, social partners and regions</strong></div>`;

    const details = document.createElement('details');
    details.className = 'sr-programme-details';
    details.innerHTML = `<summary><span>View the complete programme</span><span class="sr-programme-details__hint">Collapsed by default · click to expand</span></summary>`;

    agenda.replaceWith(details);
    details.appendChild(agenda);
    container.insertBefore(summary, details);
    title.closest('.sr-section')?.classList.add('sr-programme-section');
    return true;
  }

  function logo(src, alt, extra = '') {
    return `<img class="sr-2026-logo ${extra}" src="${ASSETS}${src}" alt="${alt}" loading="lazy">`;
  }

  function renderPartners(root = document) {
    const title = root.querySelector('#organisers-2026-title');
    const section = title?.closest('.sr-section');
    const container = section?.querySelector('.sr-container');
    if (!container) return false;

    section.classList.add('sr-2026-partners-section');
    container.innerHTML = `
      <div class="sr-2026-partners-head">
        <div>
          <span class="sr-kicker">Conference structure</span>
          <h2 id="organisers-2026-title">2026 organisers and partners</h2>
        </div>
        <p>Automotive, semiconductor and local host ecosystems in one compact overview.</p>
      </div>

      <div class="sr-2026-partners-grid">
        <article class="sr-2026-partner-group">
          <span class="sr-2026-partner-label">Organized by</span>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--4">
            ${logo('asa.png', 'Automotive Skills Alliance')}
            ${logo('pfs.png', 'Pact for Skills')}
            ${logo('trireme.png', 'TRIREME')}
            ${logo('cofunded.png', 'Co-funded by the European Union', 'sr-2026-logo--wide')}
          </div>
          <div class="sr-2026-partner-names">Automotive Skills Alliance · TRIREME</div>
        </article>

        <article class="sr-2026-partner-group">
          <span class="sr-2026-partner-label">Strategic conference partner</span>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--4">
            ${logo('semi.png', 'SEMI Europe')}
            ${logo('pfs.png', 'Pact for Skills')}
            ${logo('ecsa.png', 'European Chips Skills Academy')}
            ${logo('cofunded.png', 'Co-funded by the European Union', 'sr-2026-logo--wide')}
          </div>
          <div class="sr-2026-partner-names">SEMI Europe · ECS Academy</div>
        </article>

        <article class="sr-2026-partner-group">
          <span class="sr-2026-partner-label">Local host</span>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--3">
            ${logo('ATIT.png', 'Transilvania IT Cluster')}
            ${logo('cluj%20muni.png', 'Cluj-Napoca Municipality')}
            ${logo('TU%20Cluj.png', 'Technical University of Cluj-Napoca')}
          </div>
          <div class="sr-2026-partner-names">Transilvania IT Cluster · Cluj-Napoca Municipality · UTCN</div>
        </article>
      </div>`;
    return true;
  }

  function apply() {
    const programmeReady = ensureProgramme();
    const partnersReady = renderPartners();
    return programmeReady && partnersReady;
  }

  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
