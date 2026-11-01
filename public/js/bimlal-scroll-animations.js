/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Meditative Scroll-Reveal & Calm Micro-Interaction System
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        document.querySelectorAll('.scroll-reveal-item, .section-header-reveal').forEach(el => {
          el.classList.add('is-visible', 'is-revealed');
        });
      }
    });
  }

  function initScrollAnimations() {
    // Set stagger indices for child cards inside grids for cascading reveal
    document.querySelectorAll('.grid, #navigation-compass .grid, #services-section .grid, #events .grid, #travel-guide .grid, #trust-directory .grid').forEach(grid => {
      Array.from(grid.children).forEach((child, idx) => {
        child.style.setProperty('--stagger-index', (idx % 6).toString());
      });
    });

    // Target major content blocks: Seva cards, Event cards, About text blocks, Gallery items, Travel cards, Compass
    const selector = [
      '.temple-card',
      '.section-header-reveal',
      '#navigation-compass a',
      '#mandir-intro .temple-card',
      '#mandir-intro .grid > div',
      '#live-darshan .rounded-2xl',
      '#darshan-journey .rounded-2xl',
      '#booking-section .rounded-2xl',
      '#services-section .temple-card',
      '#dham-sanctuary .temple-card',
      '#about-swamiji .space-y-6 > div',
      '#about-swamiji .rounded-xl',
      '#about-swamiji .rounded-2xl',
      '.gallery-slide',
      '#events .temple-card',
      '#events .bg-gradient-to-br',
      '#niyamavali .temple-card',
      '#niyamavali .rounded-2xl',
      '#travel-guide .temple-card',
      '#travel-guide .rounded-2xl',
      '#pilgrim-packing-list-section',
      '#ashram-layout-section',
      '#trust-directory .temple-card',
      '#trust-directory .rounded-2xl'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll(selector));

    // Also auto-detect section header wrappers containing .temple-badge + h2/h3
    document.querySelectorAll('section .temple-badge').forEach(badge => {
      const parent = badge.closest('.text-center, .section-header-wrapper') || badge.parentElement;
      if (parent && !elements.includes(parent)) {
        elements.push(parent);
      }
    });

    const uniqueElements = Array.from(new Set(elements));

    // If reduced motion is requested or IntersectionObserver not supported, reveal all immediately
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      uniqueElements.forEach(el => {
        el.classList.add('is-visible', 'is-revealed');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    uniqueElements.forEach(el => {
      // Check if already in viewport on initial load
      const rect = el.getBoundingClientRect();
      const inInitialViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      
      if (inInitialViewport) {
        el.classList.add('is-visible', 'is-revealed');
      } else {
        el.classList.add('scroll-reveal-item');
        observer.observe(el);
      }
    });
  }

  // Sticky Header Polish & Active Nav Scroll Spy (Requirement 3)
  function initHeaderAndNavSpy() {
    const header = document.getElementById('site-header');
    const hero = document.getElementById('hero');
    const navLinks = Array.from(document.querySelectorAll('#site-header nav a[href^="#"]'));

    if (!header) return;

    let scrollTicking = false;

    // Toggle header backdrop-blur on scroll & conditional gold bottom border after scrolling past hero
    function updateHeaderOnScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const headerHeight = header.offsetHeight || 80;
      const heroBottom = hero ? (hero.offsetTop + hero.offsetHeight - headerHeight) : 450;

      // 1. Backdrop-blur effect activates dynamically as soon as user begins scrolling
      if (scrollY > 12) {
        header.classList.add('header-blurred');
      } else {
        header.classList.remove('header-blurred');
      }

      // 2. Conditional gold bottom border activates strictly after scrolling past the hero section
      if (scrollY >= heroBottom) {
        header.classList.add('header-past-hero', 'header-scrolled');
      } else {
        header.classList.remove('header-past-hero', 'header-scrolled');
      }

      scrollTicking = false;
    }

    function onHeaderScroll() {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        scrollTicking = true;
      }
    }

    window.addEventListener('scroll', onHeaderScroll, { passive: true });
    window.addEventListener('resize', updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();

    if (!navLinks.length) return;

    // Track active section to highlight corresponding nav link
    const sectionTargets = navLinks
      .map(link => {
        const id = link.getAttribute('href').substring(1);
        return { id, link, el: document.getElementById(id) };
      })
      .filter(item => item.el !== null);

    if (!sectionTargets.length) return;

    function updateActiveNav() {
      const scrollPos = window.scrollY + 140;
      let currentSectionId = sectionTargets[0].id;

      for (let i = 0; i < sectionTargets.length; i++) {
        const target = sectionTargets[i];
        const top = target.el.offsetTop;
        const height = target.el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = target.id;
          break;
        } else if (scrollPos >= top) {
          currentSectionId = target.id;
        }
      }

      sectionTargets.forEach(target => {
        if (target.id === currentSectionId) {
          target.link.classList.add('nav-active');
          target.link.setAttribute('aria-current', 'page');
        } else {
          target.link.classList.remove('nav-active');
          target.link.removeAttribute('aria-current');
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // Calm Language Switch Transition
  function initLanguageTransition() {
    window.addEventListener('bimlal-language-change', () => {
      if (prefersReducedMotion) return;
      const translatable = document.querySelectorAll('main, #site-header, section');
      translatable.forEach(el => el.classList.add('bimlal-i18n-swapping'));
      setTimeout(() => {
        translatable.forEach(el => el.classList.remove('bimlal-i18n-swapping'));
      }, 220);
    });
  }

  // Reliable Smooth Anchor Navigation & URL Hash Handling
  function initAnchorNavigation() {
    const ALIAS_MAP = {
      'seva': 'services-section',
      'services': 'services-section',
      'the-ten-sevas': 'services-section',
      'the-ten-sevas-2': 'services-section',
      'pavitra-seva': 'services-section',
      'darshan': 'darshan-journey',
      'darshan-suvidha': 'darshan-journey',
      'booking': 'booking-section',
      'plan-your-darshan': 'booking-section',
      'swamiji': 'about-swamiji',
      'swamiji-chronicle': 'about-swamiji',
      'utsav': 'events',
      'dalan': 'gallery',
      'rules': 'niyamavali',
      'trust': 'trust-directory',
      'donation': 'trust-directory',
      'dan': 'trust-directory',
      'contact': 'travel-guide',
      'travel': 'travel-guide',
      'sampark': 'travel-guide'
    };

    function resolveTarget(rawId) {
      if (!rawId) return null;
      const cleanId = rawId.replace(/^#/, '');
      const mappedId = ALIAS_MAP[cleanId] || cleanId;
      return document.getElementById(mappedId) || document.getElementById(cleanId);
    }

    function scrollToElementWithOffset(targetEl, updateHash = true, targetId = '') {
      if (!targetEl) return;
      const header = document.getElementById('site-header');
      const headerHeight = header ? (header.offsetHeight || 80) : 80;
      const targetRect = targetEl.getBoundingClientRect();
      const targetTop = targetRect.top + window.pageYOffset - headerHeight - 14;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });

      if (updateHash && targetId && window.history && window.history.pushState) {
        window.history.pushState(null, '', '#' + targetId);
      }
    }

    // Delegate clicks on all anchor links pointing to on-page IDs or aliases
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const targetId = href.substring(1);
      const targetEl = resolveTarget(targetId);

      if (targetEl) {
        e.preventDefault();

        // If mobile navigation drawer is open, close it cleanly
        if (typeof window.toggleMobileMenu === 'function') {
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            window.toggleMobileMenu(false);
          }
        }

        // Slight delay allowing mobile menu transition to finish reflowing
        setTimeout(() => {
          scrollToElementWithOffset(targetEl, true, targetId);
        }, 50);
      }
    });

    // Deep-link anchor handling on page load / refresh
    if (window.location.hash) {
      const initialId = window.location.hash.substring(1);
      const initialEl = resolveTarget(initialId);
      if (initialEl) {
        setTimeout(() => {
          scrollToElementWithOffset(initialEl, false);
        }, 150);
      }
    }

    // Support browser back/forward history buttons
    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        const el = resolveTarget(hashId);
        if (el) {
          scrollToElementWithOffset(el, false);
        }
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initHeaderAndNavSpy();
      initLanguageTransition();
      initAnchorNavigation();
    });
  } else {
    initScrollAnimations();
    initHeaderAndNavSpy();
    initLanguageTransition();
    initAnchorNavigation();
  }

  window.BimlalScrollAnimations = {
    init: initScrollAnimations
  };
})();
