document.addEventListener('DOMContentLoaded', () => {
  const secoes = document.querySelectorAll('.secao');
  let secaoAtual = 0;

  const mostrarSecao = (index) => {
    secoes.forEach((secao, i) => {
      if (i === index) {
        secao.style.display = 'block';
        setTimeout(() => {
          secao.classList.add('ativa', 'fade-in');
        }, 10);
      } else {
        secao.classList.remove('ativa', 'fade-in');
        secao.style.display = 'none';
      }
    });
  };

  window.proximaSecao = () => {
    if (secaoAtual < secoes.length - 1) {
      secaoAtual++;
      mostrarSecao(secaoAtual);
    }
  };

  window.voltarSecao = () => {
    if (secaoAtual > 0) {
      secaoAtual--;
      mostrarSecao(secaoAtual);
    }
  };

  mostrarSecao(secaoAtual);
});



