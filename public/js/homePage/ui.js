// Header scroll
window.addEventListener('scroll', () => {
    document.querySelector('.header')
      .classList.toggle('scrolled', window.scrollY > 100);
  });
  
  // Menu mobile
  const menuMobile = document.querySelector('.menu-mobile');
  const navList = document.querySelector('.nav-list');
  
  menuMobile?.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuMobile.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      menuMobile.classList.remove('active');
    });
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  // Zoom nas imagens do carrossel
  document.querySelectorAll('.carousel-item img').forEach(img => {
    img.addEventListener('click', () => {
      img.classList.toggle('zoomed');
      document.body.classList.toggle('no-scroll');
    });
  });
  