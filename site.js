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
        <a href="${routes.home}" ${active === 'home' ? 'aria-current="page"' : ''}>2027</a>
        <a href="${routes.about}" ${active === 'about' ? 'aria-current="page"' : ''}>About</a>
        <a href="${routes.c2026}" ${active === 'c2026' ? 'aria-current="page"' : ''}>2026</a>
        <a href="${routes.c2025}" ${active === 'c2025' ? 'aria-current="page"' : ''}>2025</a>
        <a href="${routes.c2024}" ${active === 'c2024' ? 'aria-current="page"' : ''}>2024</a>
        <a href="${routes.c2022}" ${active === 'c2022' ? 'aria-current="page"' : ''}>2022</a>
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
          <p>A European conference series connecting skills, industrial transformation, policy and practical implementation.</p>
        </div>
        <div>
          <h3>Conference series</h3>
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
          <p><a href="${routes.contact}">Contact the organisers</a></p>
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

  function rewriteLinks(root) {
    root.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
      if (href === '/') {
        link.setAttribute('href', BASE);
      } else if (href.startsWith('/')) {
        link.setAttribute('href', BASE + href.replace(/^\/+/, ''));
      }
    });
  }

  function enhanceContactForm(root) {
    const form = root.querySelector('.sr-form form');
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      let notice = form.querySelector('.sr-form-notice');
      if (!notice) {
        notice = document.createElement('p');
        notice.className = 'sr-form-notice';
        notice.style.marginTop = '16px';
        notice.style.fontWeight = '800';
        notice.style.color = 'var(--teal-dark)';
        form.appendChild(notice);
      }
      notice.textContent = 'Thanks — this static preview does not send email yet. Please contact office@skills-alliance.eu directly.';
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
