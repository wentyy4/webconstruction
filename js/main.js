/* ═══════════════════════════════════════════════════════
   ARCFORM — Main JavaScript
   Navigation, Header, Interactions, Animations
   ═══════════════════════════════════════════════════════ */

'use strict';

// ─── ROUTER ────────────────────────────────────────────────────────────────
const Router = (() => {
  const pages = {};
  let currentPage = null;

  function register(id, onEnter) {
    pages[id] = onEnter || null;
  }

  function navigate(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('is-active');
    });

    // Show target
    const target = document.getElementById('page-' + pageId);
    if (!target) return;

    target.classList.add('is-active');
    currentPage = pageId;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update nav active state
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.classList.toggle('is-active', link.dataset.nav === pageId);
    });

    // Run page enter callback
    if (pages[pageId]) pages[pageId]();

    // Re-init scroll reveals for new page
    ScrollReveal.init();
  }

  function getCurrent() { return currentPage; }

  return { register, navigate, getCurrent };
})();

// Expose globally
window.navigate = Router.navigate;


// ─── HEADER ────────────────────────────────────────────────────────────────
const Header = (() => {
  const header = document.getElementById('main-header');
  let lastScroll = 0;
  let ticking = false;

  function update() {
    const scrollY = window.pageYOffset;
    header.classList.toggle('header--scrolled', scrollY > 40);
    lastScroll = scrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  return { init };
})();


// ─── MOBILE MENU ───────────────────────────────────────────────────────────
const MobileMenu = (() => {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    burger?.classList.toggle('is-open', isOpen);
    menu?.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    burger?.classList.remove('is-open');
    menu?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function init() {
    burger?.addEventListener('click', toggle);

    // Close on link click
    menu?.querySelectorAll('[data-mobile-nav]').forEach(link => {
      link.addEventListener('click', () => {
        Router.navigate(link.dataset.mobileNav);
        close();
      });
    });

    // Close on escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }

  return { init, close };
})();


// ─── FILTER CHIPS ──────────────────────────────────────────────────────────
const FilterChips = (() => {
  function init() {
    document.querySelectorAll('.filter-chips').forEach(container => {
      container.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          // Update active chip
          container.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
          chip.classList.add('is-active');

          const category = chip.dataset.filter;

          // Find the nearest grid to filter
          const grid = container.nextElementSibling;
          if (!grid) return;

          grid.querySelectorAll('[data-category]').forEach(card => {
            const show = !category || category === 'all' || card.dataset.category === category;
            card.style.display = show ? '' : 'none';
          });
        });
      });
    });
  }

  return { init };
})();


// ─── FAQ ACCORDION ─────────────────────────────────────────────────────────
const FAQ = (() => {
  function toggle(item) {
    const list = item.closest('.faq-list');
    const isOpen = item.classList.contains('is-open');

    // Close all in this list
    list?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));

    // Open this one if it was closed
    if (!isOpen) item.classList.add('is-open');
  }

  function init() {
    document.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item) toggle(item);
      });
    });
  }

  return { init };
})();


// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────
const ScrollReveal = (() => {
  let observer = null;

  function init() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    // Only observe elements in the active page
    const activePage = document.querySelector('.page.is-active');
    if (!activePage) return;

    activePage.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  return { init };
})();


// ─── STAT COUNTER ANIMATION ────────────────────────────────────────────────
const StatCounter = (() => {
  function animateValue(el, target, suffix, duration = 1400) {
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(eased * target);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.dataset.count || '';
        if (!raw) return;

        const num = parseFloat(raw);
        const suffix = raw.replace(/[0-9.]/g, '');
        if (!isNaN(num)) animateValue(el, num, suffix);

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  return { init };
})();


// ─── PROGRESS BAR ANIMATION ────────────────────────────────────────────────
const ProgressBars = (() => {
  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const fill = entry.target.querySelector('.progress-bar__fill');
        const target = fill?.dataset.width;
        if (fill && target) {
          // Short delay for stagger effect
          setTimeout(() => {
            fill.style.width = target;
          }, 200);
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.progress-bar').forEach(bar => {
      const fill = bar.querySelector('.progress-bar__fill');
      if (fill && fill.dataset.width) {
        fill.style.width = '0%';
        observer.observe(bar);
      }
    });
  }

  return { init };
})();


// ─── FORM HANDLING ─────────────────────────────────────────────────────────
const Forms = (() => {
  function handleSubmit(form) {
    const btn = form.querySelector('[type="submit"]');
    const success = form.querySelector('.form__success');

    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('form__control--error');
        valid = false;
      } else {
        field.classList.remove('form__control--error');
      }
    });

    if (!valid) return;

    // Submit state
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Відправляємо...';
    }

    // Simulate async
    setTimeout(() => {
      if (btn) {
        btn.textContent = '✓ Надіслано';
        btn.style.background = 'var(--color-success)';
        btn.style.color = '#fff';
      }
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1200);
  }

  function init() {
    document.querySelectorAll('form[data-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        handleSubmit(form);
      });

      // Live validation clear on input
      form.querySelectorAll('.form__control').forEach(field => {
        field.addEventListener('input', () => {
          field.classList.remove('form__control--error');
        });
      });
    });
  }

  return { init };
})();


// ─── PROJECT CARD CLICK ────────────────────────────────────────────────────
const ProjectCards = (() => {
  function init() {
    document.querySelectorAll('[data-project]').forEach(card => {
      card.addEventListener('click', () => {
        Router.navigate('project-detail');
      });
      card.style.cursor = 'pointer';
    });
  }

  return { init };
})();


// ─── KEYBOARD NAVIGATION ───────────────────────────────────────────────────
const Keyboard = (() => {
  function init() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        MobileMenu.close();
      }
    });
  }
  return { init };
})();


// ─── SMOOTH NAV LINKS ──────────────────────────────────────────────────────
function initNavLinks() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      Router.navigate(el.dataset.nav);
    });
  });
}


// ─── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Setup nav links
  initNavLinks();

  // Init modules
  Header.init();
  MobileMenu.init();
  FilterChips.init();
  FAQ.init();
  StatCounter.init();
  ProgressBars.init();
  Forms.init();
  ProjectCards.init();
  Keyboard.init();

  // Register pages
  Router.register('home', () => {
    ScrollReveal.init();
    StatCounter.init();
    ProgressBars.init();
  });
  Router.register('services', () => ScrollReveal.init());
  Router.register('projects', () => {
    ScrollReveal.init();
    FilterChips.init();
  });
  Router.register('project-detail', () => ScrollReveal.init());
  Router.register('about', () => ScrollReveal.init());
  Router.register('contact', () => {
    ScrollReveal.init();
    Forms.init();
  });

  // Initial page
  Router.navigate('home');

  // Initial scroll reveal
  setTimeout(() => ScrollReveal.init(), 100);
});
