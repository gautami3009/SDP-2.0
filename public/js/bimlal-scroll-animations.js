/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Meditative Section Header Scroll Entrance Animations
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollAnimations() {
    // If reduced motion is requested, reveal all immediately
    if (prefersReducedMotion) {
      document.querySelectorAll('.section-header-reveal').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Collect all elements with .section-header-reveal
    const explicitHeaders = Array.from(document.querySelectorAll('.section-header-reveal'));

    // Also auto-detect any section header wrappers containing .temple-badge + h2/h3 that haven't been tagged
    const autoDetectedHeaders = [];
    document.querySelectorAll('section .temple-badge').forEach(badge => {
      const parent = badge.closest('.text-center, .section-header-wrapper') || badge.parentElement;
      if (parent && !parent.classList.contains('section-header-reveal')) {
        parent.classList.add('section-header-reveal');
        autoDetectedHeaders.push(parent);
      }
    });

    const allHeaders = Array.from(new Set([...explicitHeaders, ...autoDetectedHeaders]));

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      allHeaders.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -45px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    allHeaders.forEach(header => {
      // Check if already in viewport on page load
      const rect = header.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        header.classList.add('is-revealed');
      } else {
        observer.observe(header);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  window.BimlalScrollAnimations = {
    init: initScrollAnimations
  };
})();
