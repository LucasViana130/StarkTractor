// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona elementos do carrossel
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicators = document.querySelectorAll('.indicator');
  
  // Configurações do carrossel
  let currentIndex = 0;
  let intervalId;
  const intervalTime = 5000; // 5 segundos entre transições
  const transitionSpeed = 500; // 0.5s (deve corresponder ao CSS)

  /**
   * Move o carrossel para um slide específico
   * @param {number} index - Índice do slide para onde mover
   */
  function goToSlide(index) {
    // Garante que o índice esteja dentro dos limites
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    // Atualiza a posição do container
    container.style.transform = `translateX(-${index * 100}%)`;
    
    // Atualiza a classe 'active' nos slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    // Atualiza os indicadores
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    // Atualiza o índice atual
    currentIndex = index;
  }

  /** Avança para o próximo slide */
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  /** Volta para o slide anterior */
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  /** Inicia o autoplay do carrossel */
  function startAutoPlay() {
    // Limpa qualquer intervalo existente para evitar múltiplas instâncias
    stopAutoPlay();
    // Configura um novo intervalo
    intervalId = setInterval(nextSlide, intervalTime);
  }

  /** Para o autoplay do carrossel */
  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  /** Reseta o autoplay após interação do usuário */
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Event listeners para os controles de navegação
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Event listeners para os indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
      resetAutoPlay();
    });
  });

  // Pausa o autoplay quando o mouse está sobre o carrossel
  const carrossel = document.querySelector('.carrossel');
  carrossel.addEventListener('mouseenter', stopAutoPlay);
  carrossel.addEventListener('mouseleave', startAutoPlay);

  // Inicia o carrossel
  startAutoPlay();

  // Redimensionamento da janela - garante que o slide atual permaneça visível
  window.addEventListener('resize', () => {
    goToSlide(currentIndex);
  });
});