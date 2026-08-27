(() => {
  const BASE = '/skills-revolution/';
  const ASSETS = BASE + 'assets/';
  const VERSION = '20260827-hero-2026';
  const body = document.body;
  const fragment = body.dataset.fragment;
  const active = body.dataset.page || '';

  const routes = {
    home: BASE,
    about: BASE + 'about-us/',
    contact: BASE + 'contact/',
    c2022: BASE + 'conference-2022/',
    c2024: BASE + 'conference-2024/',
    c2025: BASE + 'conference-2025/',
    c2026: BASE + 'conference-2026/'
  };

  const navCss = document.createElement('link');
  navCss.rel = 'stylesheet';
  navCss.href = `${ASSETS}navigation.css?v=${VERSION}`;
  document.head.appendChild(navCss);

  const archiveActive = ['c2022', 'c2024', 'c2025', 'c2026'].includes(active);

  const header = document.createElement('header');
  header.className = 'sr-site-header';
  header.innerHTML = `
    <div class="sr-container sr-site-header__inner">
      <a class="sr-brand" href="${routes.home}" aria-label="Skills (R)Evolution home">
        <span class="sr-brand__mark" aria-hidden="true">SR</span>
        <span>Skills (R)Evolution</span>
      </a>
      <span class="sr-header-badge">Stuttgart 2027</span>
      <button class="sr-menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="sr-nav" id="site-nav" aria-label="Primary navigation">
        <a href="${routes.home}" ${active === 'home' ? 'aria-current="page"' : ''}>2027 conference</a>
        <a href="${routes.about}" ${active === 'about' ? 'aria-current="page"' : ''}>About</a>
        <div class="sr-nav-dropdown ${archiveActive ? 'is-current' : ''}">
          <button class="sr-nav-dropdown__toggle" type="button" aria-expanded="false">Conferences <span class="sr-nav-dropdown__icon" aria-hidden="true">▾</span></button>
          <div class="sr-nav-dropdown__menu" aria-label="Previous conferences">
            <a href="${routes.c2026}" ${active === 'c2026' ? 'aria-current="page"' : ''}><span class="sr-nav-dropdown__year">2026</span><span class="sr-nav-dropdown__place">Cluj-Napoca</span></a>
            <a href="${routes.c2025}" ${active === 'c2025' ? 'aria-current="page"' : ''}><span class="sr-nav-dropdown__year">2025</span><span class="sr-nav-dropdown__place">Ostrava</span></a>
            <a href="${routes.c2024}" ${active === 'c2024' ? 'aria-current="page"' : ''}><span class="sr-nav-dropdown__year">2024</span><span class="sr-nav-dropdown__place">Brussels</span></a>
            <a href="${routes.c2022}" ${active === 'c2022' ? 'aria-current="page"' : ''}><span class="sr-nav-dropdown__year">2022</span><span class="sr-nav-dropdown__place">Stuttgart Region</span></a>
          </div>
        </div>
        <a href="${routes.contact}" ${active === 'contact' ? 'aria-current="page"' : ''}>Contact</a>
      </nav>
    </div>`;

  const footer = document.createElement('footer');
  footer.className = 'sr-footer';
  footer.innerHTML = `
    <div class="sr-container">
      <div class="sr-footer__grid">
        <div><h2>Skills (R)Evolution</h2><p>European conference series on workforce skills, industrial transformation, education and training, and implementation of sectoral skills strategies.</p></div>
        <div><h3>Conference archive</h3><ul><li><a href="${routes.home}">Stuttgart 2027</a></li><li><a href="${routes.c2026}">Cluj-Napoca 2026</a></li><li><a href="${routes.c2025}">Ostrava 2025</a></li><li><a href="${routes.c2024}">Brussels 2024</a></li><li><a href="${routes.c2022}">Stuttgart 2022</a></li></ul></div>
        <div><h3>Organiser</h3><p>Automotive Skills Alliance</p><p><a href="${routes.contact}">Conference contact</a></p></div>
      </div>
      <div class="sr-footer__bottom">Skills (R)Evolution · Automotive Skills Alliance</div>
    </div>`;

  document.body.insertBefore(header, document.body.firstChild);
  document.body.appendChild(footer);

  const menuButton = header.querySelector('.sr-menu-toggle');
  const nav = header.querySelector('.sr-nav');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  const dropdown = header.querySelector('.sr-nav-dropdown');
  const dropdownButton = dropdown.querySelector('.sr-nav-dropdown__toggle');
  dropdownButton.addEventListener('click', event => {
    event.stopPropagation();
    const open = dropdown.classList.toggle('is-open');
    dropdownButton.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });

  function rewriteLinks(root) {
    root.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
      if (href === '/') link.setAttribute('href', BASE);
      else if (href.startsWith('/')) link.setAttribute('href', BASE + href.replace(/^\/+/, ''));
    });
  }

  function enhanceContactForm(root) {
    const form = root.querySelector('.sr-form form');
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const first = form.querySelector('[name="first_name"]')?.value || '';
      const last = form.querySelector('[name="last_name"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || '';
      const subject = encodeURIComponent('Skills (R)Evolution conference enquiry');
      const bodyText = encodeURIComponent(`Name: ${first} ${last}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:office@skills-alliance.eu?subject=${subject}&body=${bodyText}`;
    });
  }

  const programmeHighlights = {
    c2022: [
      ['Format', 'Two-day launch edition with panels, workshops and networking'],
      ['Main themes', 'Industrial transition, regional cooperation and skills intelligence'],
      ['Featured voices', 'European Commission, Bosch, Daimler Trucks, IG Metall, regions and ASA']
    ],
    c2024: [
      ['Format', 'Brussels policy discussion and TRIREME public kick-off'],
      ['Main themes', 'Skills intelligence, training delivery and competence recognition'],
      ['Featured voices', 'European Commission, ACEA, CLEPA, Ceemet, IndustriAll Europe and regions']
    ],
    c2025: [
      ['Format', 'Conference day plus optional networking evening'],
      ['Main themes', 'EU skills agenda, TRIREME, regional practice, green and digital transition'],
      ['Featured voices', 'European Commission, industry, VSB-TUO, regional initiatives and European projects']
    ],
    c2026: [
      ['Format', 'Laboratory visit, conference day, showcases and networking'],
      ['Main themes', 'Automotive + semiconductors, Union of Skills, Blueprint roll-out and regional practice'],
      ['Featured voices', 'European Parliament, industry, SEMI Europe, ASA, universities, social partners and regions']
    ]
  };

  function removeArchiveNotices(root) {
    root.querySelectorAll('.sr-archive-note').forEach(notice => notice.remove());
  }

  function enhanceHistoricalProgramme(root) {
    const highlights = programmeHighlights[active];
    if (!highlights) return;

    const agenda = root.querySelector('.sr-agenda');
    if (!agenda) return;

    const section = agenda.closest('.sr-section');
    const container = agenda.parentElement;
    if (!container) return;

    const alreadyWrapped = agenda.closest('details.sr-programme-details');
    if (alreadyWrapped) {
      alreadyWrapped.removeAttribute('open');
      return;
    }

    const summary = document.createElement('div');
    summary.className = 'sr-programme-summary';
    summary.setAttribute('aria-label', 'Programme highlights');
    summary.innerHTML = highlights.map(([label, value]) => `
      <div class="sr-programme-summary__item">
        <span class="sr-programme-summary__label">${label}</span>
        <strong>${value}</strong>
      </div>`).join('');

    const intro = document.createElement('p');
    intro.className = 'sr-programme-intro';
    intro.textContent = 'A quick overview is shown below. Expand the archive only if you want to browse the complete programme.';

    const details = document.createElement('details');
    details.className = 'sr-programme-details';
    const toggle = document.createElement('summary');
    toggle.innerHTML = `<span class="sr-programme-details__title">View the complete programme</span><span class="sr-programme-details__hint">Click to expand</span>`;
    details.appendChild(toggle);

    agenda.replaceWith(details);
    details.appendChild(agenda);
    container.insertBefore(intro, details);
    container.insertBefore(summary, intro);
    section?.classList.add('sr-programme-section');
  }

  function logo(src, alt, extraClass = '') {
    return `<img class="sr-2026-logo ${extraClass}" src="${ASSETS}${src}" alt="${alt}" loading="lazy">`;
  }

  function compact2026Roles(root) {
    if (active !== 'c2026') return;
    const title = root.querySelector('#organisers-2026-title');
    const section = title?.closest('.sr-section');
    const container = section?.querySelector('.sr-container');
    if (!container) return;

    section.classList.add('sr-2026-partners-section');
    container.innerHTML = `
      <div class="sr-2026-partners-head">
        <div>
          <span class="sr-kicker">Conference structure</span>
          <h2 id="organisers-2026-title">2026 organisers and partners</h2>
        </div>
        <p>Automotive, semiconductor and local host ecosystems behind the Cluj-Napoca edition.</p>
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
            ${logo('ATIT.avif', 'Transilvania IT Cluster')}
            ${logo('cluj%20muni.png', 'Cluj-Napoca Municipality')}
            ${logo('TU%20Cluj.png', 'Technical University of Cluj-Napoca')}
          </div>
          <div class="sr-2026-partner-names">Transilvania IT Cluster · Cluj-Napoca Municipality · UTCN</div>
        </article>
      </div>`;
  }

  function enhance2026Hero(root) {
    if (active !== 'c2026') return;

    const hero = root.querySelector('.sr-archive-hero');
    if (!hero || hero.dataset.heroEnhanced === 'true') return;

    hero.dataset.heroEnhanced = 'true';
    hero.classList.add('sr-2026-hero');

    const year = hero.querySelector('.sr-archive-year');
    if (year) year.remove();

    const art = document.createElement('div');
    art.className = 'sr-2026-hero-art';
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = `
      <div class="sr-2026-hex sr-2026-hex--outline sr-2026-hex--top"></div>
      <div class="sr-2026-hex sr-2026-hex--soft sr-2026-hex--bottom-left"></div>
      <div class="sr-2026-hex sr-2026-hex--accent sr-2026-hex--bottom-right"></div>

      <div class="sr-2026-hex sr-2026-hex--car sr-2026-hex--main">
        <svg viewBox="0 0 520 300" role="img" aria-label="Stylised connected car illustration">
          <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M110 190h292c18 0 31-6 40-18l20-27c7-9 10-16 10-25 0-11-6-18-19-22l-67-20c-14-4-31-7-50-8l-113-4c-34-1-55 7-72 26l-34 39c-13 14-23 28-31 42l-6 11c-3 5-4 10-4 14 0 8 5 12 15 12z"/>
            <circle cx="175" cy="196" r="33"/>
            <circle cx="390" cy="196" r="33"/>
            <path d="M160 118h160c19 0 33 5 47 16l22 17"/>
            <path d="M202 116l27-38"/>
            <path d="M292 117l17-38"/>
            <path d="M135 154h52"/>
            <path d="M319 154h87"/>
            <path d="M432 85v28"/>
            <path d="M418 99h28"/>
            <path d="M72 92c12-17 30-28 54-31"/>
            <path d="M64 118c22-8 44-9 66-2"/>
            <path d="M448 54c14 4 28 13 39 28"/>
            <path d="M434 52c0-18 15-33 33-33s33 15 33 33"/>
            <path d="M90 58l14 14"/>
            <path d="M466 137l22-13"/>
            <path d="M408 53l-17-18"/>
            <path d="M104 225h64"/>
            <path d="M390 225h64"/>
          </g>
        </svg>
      </div>
    `;

    hero.appendChild(art);
  }

  async function loadFragment() {
    const mount = document.getElementById('site-content');
    if (!fragment || !mount) return;
    try {
      const response = await fetch(`${BASE}${fragment}?v=${VERSION}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const main = doc.querySelector('main');
      if (!main) throw new Error('Page content not found');
      mount.replaceWith(main);
      rewriteLinks(main);
      removeArchiveNotices(main);
      enhanceContactForm(main);
      enhanceHistoricalProgramme(main);
      compact2026Roles(main);
      enhance2026Hero(main);
    } catch (error) {
      mount.innerHTML = `<section class="sr-section"><div class="sr-container"><h1>Page temporarily unavailable</h1><p>The page source could not be loaded. Please refresh or return to the <a href="${routes.home}">homepage</a>.</p></div></section>`;
      console.error(error);
    }
  }

  loadFragment();
})();
