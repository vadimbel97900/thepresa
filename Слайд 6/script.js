document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const handle = document.querySelector('.handle');
  const foreground = document.querySelector('.foreground');
  const hozPercent = document.getElementById('hoz-percent');
  const baPercent = document.getElementById('ba-percent');
  let isDragging = false;

  handle.addEventListener('pointerdown', function() {
    isDragging = true;
  });

  window.addEventListener('pointerup', function() {
    isDragging = false;
  });

  window.addEventListener('pointermove', function(event) {
    if (isDragging) {
      let rect = slider.getBoundingClientRect();
      let offsetX = (event.clientX || event.touches[0].clientX) - rect.left;
      let percentage = Math.min(Math.max(offsetX / rect.width, 0), 1) * 100;
      setSliderPosition(percentage);
    }
  });

  function setSliderPosition(percentage) {
    const sliderWidth = slider.offsetWidth;
    const handleWidth = handle.offsetWidth;
    const handlePosition = (sliderWidth * percentage / 100) - (handleWidth / 2);
    handle.style.left = `${handlePosition}px`;
    foreground.style.width = `${percentage}%`;
    hozPercent.textContent = Math.round(percentage) + '%';
    baPercent.textContent = Math.round(100 - percentage) + '%';
    highlightAnswer();
  }

  function highlightAnswer() {
    const hozValue = hozPercent.textContent;
    const baValue = baPercent.textContent;

    if (hozValue === '33%') {
      document.querySelector('.hoz').classList.add('highlight');
      document.querySelector('.ba').classList.remove('highlight');
    } else if (baValue === '67%') {
      document.querySelector('.ba').classList.add('highlight');
      document.querySelector('.hoz').classList.remove('highlight');
    } else {
      document.querySelector('.hoz').classList.remove('highlight');
      document.querySelector('.ba').classList.remove('highlight');
    }
  }

  function setPercentages(hoz, ba) {
    hozPercent.textContent = `${hoz}%`;
    baPercent.textContent = `${ba}%`;
    setSliderPosition(hoz);
  }

  function highlightCorrectAnswer() {
    setPercentages(88, 12);
  }

  // Initial percentages
  const initialHozPercent = 33;
  const initialBaPercent = 67;

  setPercentages(initialHozPercent, initialBaPercent);

  window.addEventListener('resize', function() {
    setSliderPosition(initialHozPercent);
  });

  setSliderPosition(0.25 * 100); // Начальное значение установлено на 25%

  document.querySelector('.button').addEventListener('click', highlightCorrectAnswer);
});
