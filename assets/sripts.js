document.addEventListener('DOMContentLoaded', function () {
  // Initialize all pricing sliders
  const sliderElements = document.querySelectorAll('.pricing__slider.swiper');
  const instances = new Map();

  function createSwiper(el) {
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
      observeParents: true,
      observer: true
    });
    instances.set(el, swiper);
    return swiper;
  }

  sliderElements.forEach(createSwiper);

  // Update swiper when switching tabs
  const pricingTabs = document.getElementById('pricingTabs');
  if (pricingTabs) {
    pricingTabs.addEventListener('shown.bs.tab', function (e) {
      const targetId = e.target.getAttribute('data-bs-target');
      const pane = document.querySelector(targetId);
      if (!pane) return;
      const slider = pane.querySelector('.pricing__slider.swiper');
      if (!slider) return;
      const instance = createSwiper(slider);
      // timeout to ensure pane is visible
      setTimeout(() => instance.update(), 60);
    });
  }
});

