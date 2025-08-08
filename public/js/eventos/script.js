const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const cards = document.querySelectorAll('.card');
const cardWidth = cards[0].offsetWidth + 20; // largura + margem

nextBtn.addEventListener('click', () => {
  if (index < cards.length - 1) {
    index++;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }
});
