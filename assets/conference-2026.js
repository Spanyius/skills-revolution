(() => {
  const ASSETS = '/skills-revolution/assets/';

  function logo(src, alt, extra = '') {
    return `<img class="sr-2026-logo ${extra}" src="${ASSETS}${src}" alt="${alt}" loading="lazy">`;
  }

  function renderPartners(root = document) {
    const title = root.querySelector('#organisers-2026-title');
    const section = title?.closest('.sr-section');
    const container = section?.querySelector('.sr-container');
    if (!container) return false;

    const alreadyCorrect = container.querySelector('.sr-2026-partners-stack .sr-2026-partner-row--host img[src*="ATIT.png"]');
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
            ${logo('asa.png', 'Automotive Skills Alliance')}
            ${logo('pfs.png', 'Pact for Skills')}
            ${logo('trireme.png', 'TRIREME')}
            ${logo('cofunded.png', 'Co-funded by the European Union', 'sr-2026-logo--wide')}
          </div>
        </article>

        <article class="sr-2026-partner-row sr-2026-partner-row--strategic">
          <div class="sr-2026-partner-copy">
            <span class="sr-2026-partner-label">Strategic conference partner</span>
            <strong>SEMI Europe &amp; ECS Academy</strong>
          </div>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--4">
            ${logo('semi.png', 'SEMI Europe')}
            ${logo('pfs.png', 'Pact for Skills')}
            ${logo('ecsa.png', 'European Chips Skills Academy')}
            ${logo('cofunded.png', 'Co-funded by the European Union', 'sr-2026-logo--wide')}
          </div>
        </article>

        <article class="sr-2026-partner-row sr-2026-partner-row--host">
          <div class="sr-2026-partner-copy">
            <span class="sr-2026-partner-label">Local host</span>
            <strong>Cluj-Napoca host ecosystem</strong>
          </div>
          <div class="sr-2026-logo-grid sr-2026-logo-grid--3">
            ${logo('ATIT.png', 'Transilvania IT Cluster')}
            ${logo('cluj%20muni.png', 'Cluj-Napoca Municipality')}
            ${logo('TU%20Cluj.png', 'Technical University of Cluj-Napoca')}
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
