// Swiper initialization with registry (supports many slider types)
(function sliderRegistryInit() {
  const TAB_EVENT = 'shown.bs.tab';

  // Define slider types once; add more types here
  const registry = {
    pricing: {
      selector: '.swiper[data-slider=\"pricing\"]',
      options: {
        slidesPerView: 1.1,
        spaceBetween: 14,
        pagination: { el: null, clickable: true },
        breakpoints: {
          576: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1400: { slidesPerView: 3 }
        }
      }
    },
    simple: {
      selector: '.swiper[data-slider=\"simple\"], .swiper.simple-swiper',
      options: {
        slidesPerView: 1.1,
        spaceBetween: 16,
        pagination: { el: null, clickable: true },
        breakpoints: {
          576: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      }
    }
  };

  const instances = new Map();

  function createSwiper(el, typeKey) {
    if (!window.Swiper) return null;
    if (instances.has(el)) return instances.get(el);

    const type = registry[typeKey] || {};
    const baseOptions = type.options || {};
    const options = {
      ...baseOptions,
      pagination: { ...(baseOptions.pagination || {}), el: el.querySelector('.swiper-pagination') },
      observer: true,
      observeParents: true
    };

    const swiper = new Swiper(el, options);
    instances.set(el, swiper);
    return swiper;
  }

  function initType(typeKey) {
    const type = registry[typeKey];
    if (!type) return;
    document.querySelectorAll(type.selector).forEach(el => {
      const attrType = el.getAttribute('data-slider') || typeKey;
      createSwiper(el, attrType);
    });
  }

  function initAllTypes() {
    Object.keys(registry).forEach(initType);
  }

  function onTabShown(e) {
    const targetId = e.target && e.target.getAttribute('data-bs-target');
    if (!targetId) return;
    const pane = document.querySelector(targetId);
    if (!pane) return;

    pane.querySelectorAll('.swiper').forEach(el => {
      const typeKey = el.getAttribute('data-slider') || 'simple';
      const instance = createSwiper(el, typeKey);
      if (!instance) return;
      setTimeout(() => {
        instance.updateSize();
        instance.updateSlides();
        instance.update();
      }, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTypes, { once: true });
  } else {
    initAllTypes();
  }

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



