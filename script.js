// ─────────────── Mobile menu toggle ───────────────
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-nav');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close the menu after tapping a link (mobile).
  navList.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// ─────────────── Active-link scroll spy ───────────────
// Highlights the Mission / Value / Features link for the section in view.
const sections = ['mission', 'value', 'features']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const linkFor = id => document.querySelector(`#primary-nav a[href="#${id}"]`);

if (sections.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('#primary-nav a.active')
          .forEach(a => a.classList.remove('active'));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add('active');
      }
    });
  }, {
    // Trigger when a section sits roughly under the sticky header.
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
}
