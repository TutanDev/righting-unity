// ================================================================
// Unity Framework — Package Documentation Pages
// Sidebar navigation, scroll spy, mobile toggle, copy to clipboard
// ================================================================

(function () {
  'use strict';

  // --- Sidebar group expand/collapse ---
  document.querySelectorAll('.sidebar-group-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.sidebar-group').classList.toggle('open');
    });
  });

  // --- Mobile sidebar toggle ---
  var sidebar = document.querySelector('.docs-sidebar');
  var toggleBtn = document.querySelector('.sidebar-toggle-btn');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        e.target !== toggleBtn
      ) {
        sidebar.classList.remove('open');
      }
    });
  }

  // --- Mobile top nav toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth scroll from sidebar links ---
  document.querySelectorAll('.sidebar-link[href^="#"], .sidebar-direct[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (sidebar) sidebar.classList.remove('open');
      }
    });
  });

  // --- Scroll spy: highlight active section in sidebar ---
  var allSections = Array.from(
    document.querySelectorAll('.docs-hero[id], .docs-section[id]')
  );
  var sidebarLinks = Array.from(
    document.querySelectorAll('.sidebar-link[href^="#"], .sidebar-direct[href^="#"]')
  );

  function getActiveId() {
    var scrollY = window.scrollY + 120;
    var active = null;
    for (var i = allSections.length - 1; i >= 0; i--) {
      if (allSections[i].offsetTop <= scrollY) {
        active = allSections[i].id;
        break;
      }
    }
    return active;
  }

  function updateSidebar(activeId) {
    sidebarLinks.forEach(function (link) {
      var href = link.getAttribute('href').slice(1);
      var isActive = href === activeId;
      link.classList.toggle('active', isActive);

      // Auto-open the group containing the active link
      if (isActive) {
        var group = link.closest('.sidebar-group');
        if (group) group.classList.add('open');
      }
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateSidebar(getActiveId());
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateSidebar(getActiveId());

  // --- Copy to clipboard ---
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        btn.style.color = '#22c55e';
        setTimeout(function () { btn.style.color = ''; }, 1400);
      });
    });
  });

})();
