
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


document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".swiper-coverflow-certificate");
  if (!swiperEl || typeof Swiper === "undefined") return;

  new Swiper(swiperEl, {
    slidesPerView: "auto",
    // slidesPerView: 3.2,
    spaceBetween: 32,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      480: { slidesPerView: 1.2, spaceBetween: 16 },
      768: { slidesPerView: 2.2, spaceBetween: 24 },
      1024: { slidesPerView: 3.2, spaceBetween: 32 },
    },
    centeredSlides: true,
    loop: true,
    effect: "coverflow",
    navigation: {
      nextEl: '.swiper-button-cert-prev',
      prevEl: '.swiper-button-cert-next',
    },
  });
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





// Инициализация одного слайдера
function initPricingSlider(swiperEl) {
  if (swiperEl.dataset.initialized === 'true') return;
  swiperEl.dataset.initialized = 'true';

  const slides = swiperEl.querySelectorAll('.swiper-slide');
  const slideCount = slides.length;
  const paginationContainer = swiperEl.querySelector('.swiper-pagination');

  // Добавляем класс в зависимости от количества слайдов
  swiperEl.classList.add(`pricing-slider-${slideCount}`);

  // Собираем метки из .product-pagin
  const labels = [];
  slides.forEach(slide => {
    const paginEl = slide.querySelector('.product-pagin');
    let label = paginEl ? paginEl.textContent.trim() : '';

    if (/free/i.test(label) && /challenge/i.test(label)) {
      label = 'Free';
    } else if (/ingyenes/i.test(label) && /kihívás/i.test(label)) {
      label = 'Ingyenes';
    } else if (/^\d+\s*K$/i.test(label)) {
      label = label.replace(/K$/i, ',000').replace(/\s+/g, '');
    } else if (/^\d+$/i.test(label)) {
      // оставляем как есть
    }
    if (!label) label = `Option ${labels.length + 1}`;
    labels.push(label);
  });

  // 🔸 ВСТАВЛЯЕМ ПАГИНАЦИЮ ВНУТРЬ .swiper-pagination
  if (paginationContainer) {
    paginationContainer.innerHTML = '';
    paginationContainer.classList.add('custom-pagination');

    labels.forEach((text, index) => {
      const bullet = document.createElement('span');
      bullet.classList.add('pagination-bullet');
      if (index === 2) bullet.classList.add('active');
      bullet.dataset.index = index;
      bullet.setAttribute('role', 'button');
      bullet.textContent = text;
      paginationContainer.appendChild(bullet);
    });
  }

  // Определяем начальный слайд
  let initialSlide = 0;
  if (slideCount >= 2) {
    initialSlide = Math.floor(slideCount / 2);
  }
  const slidesPerViewDesktop = Math.min(4, slideCount);

  // Инициализируем Swiper
  const swiperInstance = new Swiper(swiperEl, {
    loop: false,
    slidesPerView: 1,
    centeredSlides: true,
    centerInsufficientSlides: true,
    initialSlide: initialSlide,
    watchSlidesProgress: true,
    a11y: false,
    slideToClickedSlide: false,

    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: slidesPerViewDesktop,
      },
    },

    on: {
      init: function () {
        if (paginationContainer) {
          updateActiveBullet(this.activeIndex);
        }
        this.slides.forEach(slide => slide.removeAttribute('inert'));
      },
    },
  });

  // Обновление активного bullet
  function updateActiveBullet(index) {
    if (!paginationContainer) return;
    paginationContainer.querySelectorAll('.pagination-bullet').forEach((bullet, i) => {
      bullet.classList.toggle('active', i === index);
    });
  }

  swiperInstance.on('slideChange', () => {
    updateActiveBullet(swiperInstance.activeIndex);
  });

  // Клик по bullet
  if (paginationContainer) {
    paginationContainer.addEventListener('click', (e) => {
      const bullet = e.target.closest('.pagination-bullet');
      if (bullet) {
        const index = parseInt(bullet.dataset.index, 10);
        swiperInstance.slideTo(index);
      }
    });
  }

  // Опционально: клик по слайду
  swiperEl.addEventListener('click', (e) => {
    const clickedSlide = e.target.closest('.swiper-slide');
    if (clickedSlide) {
      const index = Array.from(slides).indexOf(clickedSlide);
      if (index !== -1) {
        swiperInstance.slideTo(index);
      }
    }
  });
}

// Инициализация всех слайдеров
function initAllPricingSliders() {
  document.querySelectorAll('.swiper[data-slider="pricing"]').forEach(initPricingSlider);
}

// Запуск после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllPricingSliders);
} else {
  initAllPricingSliders();
}

// Поддержка Bootstrap-табов (если используется)
document.addEventListener('shown.bs.tab', initAllPricingSliders);

// Функция инициализации ВСЕХ слайдеров
function initAllPricingSliders() {
  document.querySelectorAll('.swiper[data-slider="pricing"]').forEach(initPricingSlider);
}

// Запуск после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllPricingSliders);
} else {
  initAllPricingSliders();
}

// Поддержка динамического контента (например, табы)
// Если вы переключаете табы и слайдер появляется "после" — вызывайте initAllPricingSliders()
// или лучше — initPricingSlider для конкретного контейнера

// Пример: при переключении таба (Bootstrap)
document.addEventListener('shown.bs.tab', () => {
  initAllPricingSliders();
});



