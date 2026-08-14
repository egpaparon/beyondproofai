/* ==========================================================================
   Flynn Law Firm PLLC — main.js
   Vanilla. No dependencies. Progressive enhancement only — every page is
   fully readable and navigable with JavaScript disabled.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Sticky header shadow
     ------------------------------------------------------------------ */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    header.parentNode.insertBefore(sentinel, header);

    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle('is-stuck', !entries[0].isIntersecting);
      },
      { threshold: 0 }
    ).observe(sentinel);
  }

  /* ------------------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    var scrim = document.querySelector('.nav-scrim');
    if (!toggle || !nav) return;

    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      nav.classList.add('is-open');
      if (scrim) scrim.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    }

    function close() {
      nav.classList.remove('is-open');
      if (scrim) scrim.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') close();
      else open();
    });

    if (scrim) scrim.addEventListener('click', close);

    var closeBtn = nav.querySelector('.nav__close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
    });

    // Focus trap while the drawer is open
    nav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
      var focusables = nav.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea'
      );
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // Mobile: dropdown triggers expand in place instead of navigating
    var mq = window.matchMedia('(max-width: 63.99rem)');
    nav.querySelectorAll('.nav__link[aria-expanded]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!mq.matches) return;
        e.preventDefault();
        var item = link.closest('.nav__item');
        var isOpen = item.classList.toggle('is-open');
        link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });

    // Reset drawer state when returning to desktop
    mq.addEventListener('change', function (e) {
      if (!e.matches) {
        nav.classList.remove('is-open');
        if (scrim) scrim.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------
     3. Accordions (FAQ) — <details>-free so we can animate height
     ------------------------------------------------------------------ */
  function initAccordions() {
    document.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion__item');
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        var group = trigger.closest('.accordion');

        // Single-open behaviour when the accordion opts in
        if (!expanded && group && group.dataset.single === 'true') {
          group.querySelectorAll('.accordion__item.is-open').forEach(function (open) {
            open.classList.remove('is-open');
            open.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
          });
        }

        item.classList.toggle('is-open', !expanded);
        trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    });

    // Deep-link: /faq.html#question-id opens that item
    if (window.location.hash.length > 1) {
      var el = document.getElementById(window.location.hash.slice(1));
      var target = el && el.closest ? el.closest('.accordion__item') : null;
      if (target) {
        target.classList.add('is-open');
        var t = target.querySelector('.accordion__trigger');
        if (t) t.setAttribute('aria-expanded', 'true');
      }
    }
  }

  /* ------------------------------------------------------------------
     4. Scroll reveal
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    items.forEach(function (el) {
      // Stagger siblings that share a parent
      if (!el.style.getPropertyValue('--reveal-delay')) {
        var siblings = Array.prototype.slice.call(
          el.parentNode.querySelectorAll(':scope > [data-reveal]')
        );
        var idx = siblings.indexOf(el);
        if (idx > 0) el.style.setProperty('--reveal-delay', Math.min(idx, 5) * 70 + 'ms');
      }
      io.observe(el);
    });

    // Safety net 1: anything already on screen at load (e.g. the page opened
    // at an anchor) reveals immediately rather than waiting for a scroll.
    requestAnimationFrame(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('is-revealed');
          io.unobserve(el);
        }
      });
    });

  }

  /* ------------------------------------------------------------------
     5. Sticky mobile action bar — appears once the hero scrolls away
     ------------------------------------------------------------------ */
  function initActionBar() {
    var bar = document.querySelector('.action-bar');
    if (!bar) return;
    document.body.classList.add('has-action-bar');

    function update() {
      bar.classList.toggle('is-visible', window.scrollY > 420);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ------------------------------------------------------------------
     6. Case-review form — progressive disclosure + inline validation
     ------------------------------------------------------------------ */
  function initForms() {
    document.querySelectorAll('form[data-case-form]').forEach(function (form) {
      // Reveal the secondary fields on first meaningful interaction
      var expand = function () {
        form.classList.add('is-expanded');
      };
      form.querySelectorAll('.form__first input, .form__first select').forEach(function (el) {
        el.addEventListener('focus', expand, { once: true });
        el.addEventListener('input', expand, { once: true });
      });

      var fields = form.querySelectorAll('[required]');

      function validateField(el) {
        var field = el.closest('.field');
        if (!field) return el.checkValidity();
        var valid = el.checkValidity();
        field.classList.toggle('has-error', !valid);
        var err = field.querySelector('.field__error');
        if (err && !valid) {
          err.textContent = el.validationMessage;
        }
        el.setAttribute('aria-invalid', valid ? 'false' : 'true');
        return valid;
      }

      fields.forEach(function (el) {
        el.addEventListener('blur', function () {
          if (el.value !== '') validateField(el);
        });
        el.addEventListener('input', function () {
          var field = el.closest('.field');
          if (field && field.classList.contains('has-error')) validateField(el);
        });
      });

      form.addEventListener('submit', function (e) {
        expand();
        var firstInvalid = null;
        fields.forEach(function (el) {
          if (!validateField(el) && !firstInvalid) firstInvalid = el;
        });
        if (firstInvalid) {
          e.preventDefault();
          firstInvalid.focus();
          firstInvalid.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'center'
          });
        }
        // NOTE: with no action endpoint wired yet, prevent a broken navigation
        // and route to the confirmation page so the flow is testable.
        if (!firstInvalid && !form.getAttribute('action')) {
          e.preventDefault();
          window.location.href = form.dataset.success || 'thank-you.html';
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     7. Sixty-second Oklahoma workers' comp evaluator
     ------------------------------------------------------------------ */
  function initEvaluator() {
    var root = document.querySelector('[data-evaluator]');
    if (!root) return;

    var steps = Array.prototype.slice.call(root.querySelectorAll('.evaluator__step'));
    var bars = Array.prototype.slice.call(root.querySelectorAll('.evaluator__progress i'));
    var live = root.querySelector('[data-evaluator-live]');
    var history = [];

    function show(id) {
      steps.forEach(function (step) {
        step.hidden = step.dataset.step !== id;
      });
      var current = steps.filter(function (s) {
        return s.dataset.step === id;
      })[0];
      if (!current) return;

      var depth = parseInt(current.dataset.depth || '0', 10);
      bars.forEach(function (bar, i) {
        bar.classList.toggle('is-done', i < depth);
      });

      var heading = current.querySelector('.evaluator__q, .evaluator__verdict h4');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
      if (live) {
        live.textContent = heading ? heading.textContent : '';
      }
    }

    root.addEventListener('click', function (e) {
      var next = e.target.closest('[data-next]');
      if (next) {
        var currentStep = next.closest('.evaluator__step');
        if (currentStep) history.push(currentStep.dataset.step);
        show(next.dataset.next);
        return;
      }
      var back = e.target.closest('[data-back]');
      if (back) {
        var prev = history.pop();
        show(prev || 'start');
        return;
      }
      var restart = e.target.closest('[data-restart]');
      if (restart) {
        history = [];
        show('start');
      }
    });

    show('start');
  }

  /* ------------------------------------------------------------------
     8. Current year in footers
     ------------------------------------------------------------------ */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function boot() {
    // Tells the inline head-script failsafe that we booted successfully, so it
    // does not strip the .js class and force all revealed content visible.
    window.__flynnBooted = true;
    initStickyHeader();
    initNav();
    initAccordions();
    initReveal();
    initActionBar();
    initForms();
    initEvaluator();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
