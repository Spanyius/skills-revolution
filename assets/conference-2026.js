(() => {
  const ASSETS = '/skills-revolution/assets/';

  const links = {
    asa: 'https://automotive-skills-alliance.eu/',
    pfs: 'https://pact-for-skills.ec.europa.eu/',
    trireme: 'https://project-trireme.eu/',
    cofunded: 'https://erasmus-plus.ec.europa.eu/',
    semi: 'https://www.semi.org/eu',
    ecsa: 'https://chipsacademy.eu/',
    atit: 'https://www.transilvaniait.ro/',
    cluj: 'https://primariaclujnapoca.ro/',
    utcn: 'https://utcluj.ro/'
  };

  function logo(src, alt, url, label = '', extra = '') {
    const noLabel = label ? '' : ' sr-2026-logo-link--no-label';
    const labelMarkup = label ? `<span class="sr-2026-logo-name">${label}</span>` : '';
    return `
      <a class="sr-2026-logo-link${noLabel}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${alt} website in a new tab">
        <img class="sr-2026-logo ${extra}" src="${ASSETS}${src}" alt="${alt}" loading="lazy">
        ${labelMarkup}
      </a>`;
  }

  function renderPartners(root = document) {
    const title = root.querySelector('#organisers-2026-title');
    const section = title?.closest('.sr-section');
    const container = section?.querySelector('.sr-container');
    if (!container) return false;

    const alreadyCorrect = container.querySelector('.sr-2026-partners-stack .sr-2026-logo-link[href="https://www.transilvaniait.ro/"]');
    if (alreadyCorrect) return true;

    section.dataset.partnerRowsReady = 'true';
    section.classList.add('sr-2026-partners-section');
    container.innerHTML = `
      <div class="sr-2026-partners-head">
        <span class="sr-kicker">Conference structure</span>
        <h2 id="organisers-2026-title">Organisers and partners</h2>
        <p>Automotive, semiconductor and local host ecosystems behind the Cluj-Napoca edition.</p>
      </div>

      <div class="sr-2026-partners-stack">
        <article class="sr-2026-partner-row sr-2026-partner-row--organiser">
          <div class="sr-2026-partner-copy">
            <span class="sr-2026-partner-label">Organized by</span>
            <strong>Automotive Skills Alliance &amp; TRIREME</strong>
          </div>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--4">
            ${logo('asa.png', 'Automotive Skills Alliance', links.asa, 'Automotive Skills Alliance')}
            ${logo('pfs.png', 'Pact for Skills', links.pfs)}
            ${logo('trireme.png', 'TRIREME', links.trireme, 'TRIREME')}
            ${logo('cofunded.png', 'Co-funded by the European Union', links.cofunded, '', 'sr-2026-logo--wide')}
          </div>
        </article>

        <article class="sr-2026-partner-row sr-2026-partner-row--strategic">
          <div class="sr-2026-partner-copy">
            <span class="sr-2026-partner-label">Strategic conference partner</span>
            <strong>SEMI Europe &amp; European Chips Skills Academy</strong>
          </div>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--4">
            ${logo('semi.png', 'SEMI Europe', links.semi, 'SEMI Europe')}
            ${logo('pfs.png', 'Pact for Skills', links.pfs)}
            ${logo('ecsa.png', 'European Chips Skills Academy', links.ecsa, 'European Chips Skills Academy')}
            ${logo('cofunded.png', 'Co-funded by the European Union', links.cofunded, '', 'sr-2026-logo--wide')}
          </div>
        </article>

        <article class="sr-2026-partner-row sr-2026-partner-row--host">
          <div class="sr-2026-partner-copy">
            <span class="sr-2026-partner-label">Local host</span>
            <strong>Cluj-Napoca host ecosystem</strong>
          </div>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--3">
            ${logo('ATIT.png', 'Transilvania IT Cluster', links.atit, 'Transilvania IT Cluster')}
            ${logo('cluj%20muni.png', 'Cluj-Napoca Municipality', links.cluj, 'Cluj-Napoca Municipality')}
            ${logo('TU%20Cluj.png', 'Technical University of Cluj-Napoca', links.utcn, 'Technical University of Cluj-Napoca')}
          </div>
        </article>
      </div>`;
    return true;
  }

  const ensurePartners = () => {
    if (renderPartners()) return;
    const observer = new MutationObserver(() => {
      if (renderPartners()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => renderPartners(), 50);
    setTimeout(() => renderPartners(), 250);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensurePartners, { once: true });
  } else {
    ensurePartners();
  }
})();
