// Wayve - JS principal para navegação fullscreen e animações

document.addEventListener('DOMContentLoaded', function () {
  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Destaques animados na seção Sobre
  const destaques = document.querySelectorAll('.destaque-item');
  destaques.forEach((item, i) => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.transition = 'opacity .7s cubic-bezier(.4,2,.6,1)';
      item.style.opacity = 1;
    }, 400 + i * 300);
  });

  // Carrossel simples para projetos e depoimentos
  function simpleCarousel(containerSelector, cardSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    let isDown = false, startX, scrollLeft;
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
    // Touch events
    let touchStartX = 0, touchScrollLeft = 0;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = container.scrollLeft;
    });
    container.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.5;
      container.scrollLeft = touchScrollLeft - walk;
    });
  }
  simpleCarousel('.projetos-carousel', '.projeto-card');
  simpleCarousel('.depoimentos-carousel', '.depoimento');

  // Formulário de contato (simulação)
  const form = document.querySelector('.contato-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.querySelector('button').disabled = true;
      form.querySelector('button').textContent = 'Enviando...';
      setTimeout(() => {
        alert('Mensagem enviada com sucesso!');
        form.reset();
        form.querySelector('button').disabled = false;
        form.querySelector('button').textContent = 'Enviar';
      }, 1200);
    });
  }
});
