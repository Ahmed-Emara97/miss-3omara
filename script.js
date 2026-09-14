document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- dark mode toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('nf-theme');
if (savedTheme === 'dark') root.classList.add('dark');

themeToggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('nf-theme', root.classList.contains('dark') ? 'dark' : 'light');
});

/* ---------- scroll progress bar ---------- */
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const height = h.scrollHeight - h.clientHeight;
  progressFill.style.width = height > 0 ? `${(scrolled / height) * 100}%` : '0%';
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ---------- back to top ---------- */
const toTop = document.getElementById('toTop');
document.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 560);
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- scrollspy ---------- */
const navLinks = document.querySelectorAll('[data-nav]');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`[data-nav][href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => s && spyObserver.observe(s));

/* ---------- scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  rootMargin: '0px 0px -20px 0px',
  threshold: 0.02 
});

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- animated stat counters ---------- */
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.2 });

counters.forEach(el => counterObserver.observe(el));

/* ---------- publications filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('#pubList .pub-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    pubItems.forEach(item => {
      const type = item.getAttribute('data-type');
      const matches = filter === 'all'
        || type === filter
        || (filter === 'other' && (type === 'other' || type === 'school'));
      item.classList.toggle('hidden', !matches);
    });
  });
});

/* ---------- 3D Hero Tilt Effect للكمبيوتر ---------- */
const heroFigure = document.querySelector('.hero-figure');
const figureFrame = document.querySelector('.figure-frame');

if (heroFigure && figureFrame && window.innerWidth > 900) {
  heroFigure.addEventListener('mousemove', (e) => {
    const rect = heroFigure.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    figureFrame.style.animation = 'none';
    figureFrame.style.transform = `rotateY(${x * 0.08}deg) rotateX(${-y * 0.08}deg) translateY(-4px)`;
  });

  heroFigure.addEventListener('mouseleave', () => {
    figureFrame.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    figureFrame.style.animation = 'float3D 6s ease-in-out infinite alternate';
  });
}
