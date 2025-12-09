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
    },
    videos: {
      selector: '.videos__slider',
      options: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 25,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false
        },
        navigation: {
          nextEl: '.videos__nav--next',
          prevEl: '.videos__nav--prev'
        },
        breakpoints: {
          320: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.2 },
          1200: { slidesPerView: 3 }
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
      observer: true,
      observeParents: true
    };
    // attach pagination only if present or element exists
    const paginationEl = el.querySelector('.swiper-pagination');
    if (baseOptions.pagination || paginationEl) {
      options.pagination = { ...(baseOptions.pagination || {}), el: paginationEl };
    }

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





document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".swiper-coverflow-custom");
  if (!swiperEl || typeof Swiper === "undefined") return;

  new Swiper(swiperEl, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 6,
    spaceBetween: -35,
    loop: true,
    speed: 1200,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 120,
      modifier: 1,
      slideShadows: false,
    },

    breakpoints: {
      0: { slidesPerView: 1.8 },
      801: { slidesPerView: 4.5 },
      1300: { slidesPerView: 6 }
    },

    navigation: {
      nextEl: ".testimonials__arrow--next",
      prevEl: ".testimonials__arrow--prev",
    }
  });
});

function initProductSliders(root = document) {
  const sliders = root.querySelectorAll('.product-slider');

  if (!sliders.length) return; // Ничего нет — ничего не делаем

  sliders.forEach(slider => {
      const slides = slider.querySelectorAll('.swiper-slide');
      if (!slides.length) return;

      // Создаём Swiper
      const swiper = new Swiper(slider, {
          slidesPerView: 'auto',
          spaceBetween: 24,
          centeredSlides: true,
          loop: slides.length > 2,
          pagination: {
              el: slider.querySelector('.swiper-pagination'),
              clickable: true
          },
          navigation: {
              nextEl: slider.parentElement.querySelector('.next'),
              prevEl: slider.parentElement.querySelector('.prev'),
          },
          breakpoints: {
              0:   { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1200:{ slidesPerView: 3 }
          }
      });

      // Fancybox видео
      slides.forEach(slide => {
          slide.addEventListener("click", () => {
              const url = slide.dataset.video;
              if (!url || !window.Fancybox) return;

              Fancybox.show([{ src: url, type: "video" }]);
          });
      });
  });
}


// ---------- ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener("DOMContentLoaded", () => {
  initProductSliders();
});

// ---------- ПОДДЕРЖКА BOOTSTRAP TABS ----------
document.addEventListener("shown.bs.tab", e => {
  const pane = document.querySelector(e.target.getAttribute("data-bs-target"));
  if (pane) {
      setTimeout(() => initProductSliders(pane), 50); // даем вкладке открыться
  }
});



Fancybox.bind("[data-fancybox]", {
  placeFocusBack: false,
  Thumbs: false,
	Toolbar: {
    display: [
      "zoom",
      "fullscreen",
      "download",
      "close"
    ]
  }
});