// Анимация счётчиков при появлении
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-value');
      let count = 0;
      const step = Math.ceil(target / 50);

      const update = () => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = count;
          requestAnimationFrame(update);
        }
      };
      update();
      obs.unobserve(counter); // запускается один раз
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// Анимация карточек при прокрутке
const featureCards = document.querySelectorAll('.feature-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

featureCards.forEach(card => cardObserver.observe(card));
