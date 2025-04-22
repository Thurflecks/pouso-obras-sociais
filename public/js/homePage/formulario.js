const form = document.querySelector('.contato-form');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  if (!formData.get('nome') || !formData.get('email') || !formData.get('mensagem')) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  form.reset();
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
});
