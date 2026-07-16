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

// ─────────────── Modals ───────────────
function closeModal(m) {
  m.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const m = document.getElementById(btn.getAttribute('data-modal'));
    if (m) {
      m.hidden = false;
      document.body.style.overflow = 'hidden';   // lock background scroll
    }
  });
});

document.querySelectorAll('.modal').forEach(m => {
  // Click the dark overlay (outside the dialog) to close.
  m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
  m.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(m)));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
});
