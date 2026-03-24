// ================================================================
// Unity Framework — Showcase Website
// Navigation, scroll animations, copy-to-clipboard
// ================================================================

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll-based reveal animations ---
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealTargets = document.querySelectorAll(
      '.package-header, .feature, .util-card, .code-card, .examples-card, .layer-diagram'
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            // Stagger animation by 50ms per item within the same batch
            var siblings = entry.target.parentElement
              ? Array.from(entry.target.parentElement.children).filter(function (el) {
                  return el.classList.contains(entry.target.classList[0]);
                })
              : [];
            var siblingIndex = siblings.indexOf(entry.target);
            var delay = siblingIndex >= 0 ? siblingIndex * 50 : 0;

            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Copy to clipboard ---
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(function () {
        // Brief visual feedback
        var originalColor = btn.style.color;
        btn.style.color = '#22c55e';
        setTimeout(function () {
          btn.style.color = originalColor;
        }, 1200);
      });
    });
  });

  // --- Active nav link highlighting on scroll ---
  var sections = document.querySelectorAll('section[id]');
  var navLinkElements = document.querySelectorAll('.nav-link[href^="#"]');

  function highlightNav() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinkElements.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
})();
