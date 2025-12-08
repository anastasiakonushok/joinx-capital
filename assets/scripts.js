// Swiper initialization for Pricing tabs (Bootstrap 5 compatible)
(function init() {
  const SLIDER_SELECTOR = '.swiper.pricing__slider';
  const SIMPLE_SELECTOR = '.swiper.simple-swiper';
  const TAB_EVENT = 'shown.bs.tab';

  const instances = new Map();

  function createSwiper(el) {
    if (!window.Swiper) return null;
    if (instances.has(el)) return instances.get(el);
    const swiper = new Swiper(el, {
      slidesPerView: 1.1,
      spaceBetween: 14,
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        576: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1400: { slidesPerView: 3 }
      },
      observer: true,
      observeParents: true
    });
    instances.set(el, swiper);
    return swiper;
  }

  function initAll() {
    document.querySelectorAll(SLIDER_SELECTOR).forEach(el => createSwiper(el));
    document.querySelectorAll(SIMPLE_SELECTOR).forEach(el => {
      if (instances.has(el)) return;
      const swiper = new Swiper(el, {
        slidesPerView: 1.1,
        spaceBetween: 16,
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true
        },
        breakpoints: {
          576: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        },
        observer: true,
        observeParents: true
      });
      instances.set(el, swiper);
    });
  }

  function onTabShown(e) {
    const targetId = e.target && e.target.getAttribute('data-bs-target');
    if (!targetId) return;
    const pane = document.querySelector(targetId);
    if (!pane) return;
    const slider = pane.querySelector(SLIDER_SELECTOR);
    if (!slider) return;
    const instance = createSwiper(slider);
    if (!instance) return;
    setTimeout(() => {
      instance.updateSize();
      instance.updateSlides();
      instance.update();
    }, 200);
  }

  // Ensure init runs whether DOMContentLoaded already fired or not
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }

  // Listen globally for Bootstrap tab shown events
  document.addEventListener(TAB_EVENT, onTabShown);
})();

// Lock body scroll when mobile menu is opened (Bootstrap collapse)
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('mainMenu');
  if (!menu) return;
  menu.addEventListener('show.bs.collapse', () => {
    document.body.style.overflow = 'hidden';
  });
  menu.addEventListener('hidden.bs.collapse', () => {
    document.body.style.overflow = '';
  });
});



