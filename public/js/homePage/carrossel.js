
document.addEventListener('DOMContentLoaded', () => {
  new Splide('.hero-carousel', {
    type: 'fade',
    autoplay: true,
    pauseOnHover: false,
    interval: 5000,
    arrows: true,
    pagination: true,
    classes: {
      arrows: 'splide__arrows your-class-arrows',
      arrow: 'splide__arrow your-class-arrow icon-hero-left',
      pagination: 'splide__pagination your-class-pagination',
    }
  }).mount();
});


document.addEventListener('DOMContentLoaded', () => {
  new Splide('#carrosselCirculos', {
    type: 'loop',
    perPage: 4, 
    arrows: true, 
    pagination: false, 
    classes: {
      prev: 'splide__arrow--prev icon-passar icon-left',
      next: 'splide__arrow--next icon-passar icon-right',
    }
  }).mount();



  const track = document.getElementById('carouselTrack');
  if (!track) return;

  let currentIndex = 0;
  let isPlaying = true;
  let interval;
  const totalItems = track.children.length;
  const playPauseIcon = document.getElementById('playIcon');

  const updateSlide = () => {
    track.style.transform = `translateX(-${currentIndex * 16.666}%)`;
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateSlide();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateSlide();
  };

  const startAutoScroll = () => {
    interval = setInterval(nextSlide, 3000);
    playPauseIcon?.setAttribute('d', 'M6 4h4v16H6zm8 0h4v16h-4z');
    isPlaying = true;
  };

  const stopAutoScroll = () => {
    clearInterval(interval);
    playPauseIcon?.setAttribute('d', 'M8 5v14l11-7z');
    isPlaying = false;
  };

  document.querySelector('[aria-label="Próximo"]')?.addEventListener('click', nextSlide);
  document.querySelector('[aria-label="Anterior"]')?.addEventListener('click', prevSlide);
  document.querySelector('[aria-label="Play/Pause"]')?.addEventListener('click', () => {
    isPlaying ? stopAutoScroll() : startAutoScroll();
  });

  document.querySelector('.carousel-wrapper')?.addEventListener('mouseenter', stopAutoScroll);
  document.querySelector('.carousel-wrapper')?.addEventListener('mouseleave', () => {
    if (isPlaying) startAutoScroll();
  });

  document.querySelectorAll('.carousel-controls button').forEach(btn =>
    btn.addEventListener('click', () => btn.blur())
  );

  startAutoScroll();
});

const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true);
    const inner = scroller.querySelector(".scroller__inner");
    const content = Array.from(inner.children);
    content.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", true);
      inner.appendChild(clone);
    });
  });
}

