/* ================================================
   main.js — 88 Events
   ================================================ */

/* ---- NAVBAR scroll class ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('stuck', window.scrollY > 50);
}, { passive: true });

/* ---- MOBILE DRAWER ---- */
const menuBtn        = document.getElementById('menuBtn');
const drawer         = document.getElementById('drawer');
const drawerClose    = document.getElementById('drawerClose');
const drawerBackdrop = document.getElementById('drawerBackdrop');

function openDrawer() {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  menuBtn.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  document.body.style.overflow = '';
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);

document.querySelectorAll('#drawer nav a, .drawer-cta').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll(
  '.svc, .id-card, .val, .pp-row, .contact-card, .col-text, .col-cards'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4 * 0.08) + 's';
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => obs.observe(el));

/* ---- FOOTER YEAR ---- */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
