(() => {
  const BASE = '/skills-revolution/';
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
  navCss.href = BASE + 'navigation.css';
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
          <button class="sr-nav-dropdown__toggle" type="button" aria-expanded="false">
            Conferences <span class="sr-nav-dropdown__icon" aria-hidden="true">▾</span>
          </button>
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
        <div>
          <h2>Skills (R)Evolution</h2>
          <p>European conference series on workforce skills, industrial transformation, education and training, and implementation of sectoral skills strategies.</p>
        </div>
        <div>
          <h3>Conference archive</h3>
          <ul>
            <li><a href="${routes.home}">Stuttgart 2027</a></li>
            <li><a href="${routes.c2026}">Cluj-Napoca 2026</a></li>
            <li><a href="${routes.c2025}">Ostrava 2025</a></li>
            <li><a href="${routes.c2024}">Brussels 2024</a></li>
            <li><a href="${routes.c2022}">Stuttgart 2022</a></li>
          </ul>
        </div>
        <div>
          <h3>Organiser</h3>
          <p>Automotive Skills Alliance</p>
          <p><a href="${routes.contact}">Conference contact</a></p>
        </div>
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

  async function loadFragment() {
    const mount = document.getElementById('site-content');
    if (!fragment || !mount) return;
    try {
      const response = await fetch(BASE + fragment, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const main = doc.querySelector('main');
      if (!main) throw new Error('Page content not found');
      mount.replaceWith(main);
      rewriteLinks(main);
      enhanceContactForm(main);
    } catch (error) {
      mount.innerHTML = `<section class="sr-section"><div class="sr-container"><h1>Page temporarily unavailable</h1><p>The page source could not be loaded. Please refresh or return to the <a href="${routes.home}">homepage</a>.</p></div></section>`;
      console.error(error);
    }
  }

  loadFragment();
})();
