document.addEventListener("DOMContentLoaded", () => {
  // === 1. Счётчик символов ===
  const textarea = document.querySelector("textarea");
  const counter = document.getElementById("char-count");

  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / 500`;
    });
  }

  // === 2. Анимация появления элементов при прокрутке ===
  const fadeIns = document.querySelectorAll(".fade-in");
  fadeIns.forEach(el => {
    el.style.opacity = "0"; // на всякий случай
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeIns.forEach(el => observer.observe(el));
});

function showMessage(event) {
  event.preventDefault(); // отменяем отправку формы

  // Показываем всплывающее уведомление
  const note = document.createElement("div");
  note.textContent = "✅ Сообщение отправлено!";
  note.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #4caf50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: bold;
    font-size: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;
  `;

  document.body.appendChild(note);

  requestAnimationFrame(() => {
    note.style.opacity = "1";
    note.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    note.style.opacity = "0";
    note.style.transform = "translateY(20px)";
    setTimeout(() => note.remove(), 300);
  }, 3000);

  // Очистка формы (необязательно)
  event.target.reset();
  const counter = document.getElementById("char-count");
  if (counter) counter.textContent = "0 / 500";
}

const hamster = document.querySelector(".wheel-and-hamster");
const coinContainer = document.getElementById("coin-container");

if (hamster && coinContainer) {
  hamster.addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
      const coin = document.createElement("div");
      coin.classList.add("coin-fall");
      coin.style.left = `${hamster.getBoundingClientRect().left + 50 + (Math.random() * 60 - 30)}px`;
      coin.style.top = `${hamster.getBoundingClientRect().top}px`;
      coinContainer.appendChild(coin);

      setTimeout(() => {
        coin.remove();
      }, 1000);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const hamster = document.querySelector(".wheel-and-hamster");
  const coin = document.getElementById("coin");

  if (hamster && coin) {
    hamster.addEventListener("click", () => {
      coin.classList.add("show");

      setTimeout(() => {
        coin.classList.remove("show");
      }, 1000);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // === 1. Счётчик символов ===
  const textarea = document.querySelector("textarea");
  const counter = document.getElementById("char-count");

  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / 500`;
    });
  }

  // === 2. Анимация при прокрутке ===
  const fadeIns = document.querySelectorAll(".fade-in");
  fadeIns.forEach(el => el.style.opacity = "0");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeIns.forEach(el => observer.observe(el));

  // === 3. Звуки ===
  const bb8 = document.querySelector(".bb8");
  const toggleCheckbox = document.querySelector(".bb8-toggle__checkbox");
  const hamster = document.querySelector(".wheel-and-hamster");

  const sounds = [
    "/images/bb8-1.mp3",
    "/images/bb8-2.mp3",
    "/images/bb8-3.mp3",
    "/images/bb8-4.mp3",
    "/images/bb8-5.mp3",
    "/images/bb8-6.mp3"
  ];

  let currentAudio = null;

  function playRandomSound() {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const randomIndex = Math.floor(Math.random() * sounds.length);
    currentAudio = new Audio(sounds[randomIndex]);
    currentAudio.loop = false;
    currentAudio.play().catch(e => {
      console.warn("Ошибка воспроизведения звука:", e);
    });
  }

  function playHamsterSound() {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio("/images/tap_tap.mp3");
    currentAudio.loop = false;
    currentAudio.play().catch(e => {
      console.warn("Не удалось воспроизвести звук хомяка:", e);
    });
  }

  if (bb8) {
    bb8.addEventListener("click", playRandomSound);
  }

  if (toggleCheckbox) {
    toggleCheckbox.addEventListener("change", playRandomSound);
  }

  if (hamster) {
    hamster.addEventListener("click", () => {
      playHamsterSound();

      // Дополнительно: визуальный эффект монет
      const coin = document.getElementById("coin");
      const coinContainer = document.getElementById("coin-container");

      if (coin) {
        coin.classList.add("show");
        setTimeout(() => coin.classList.remove("show"), 1000);
      }

      if (coinContainer) {
        for (let i = 0; i < 10; i++) {
          const fallingCoin = document.createElement("div");
          fallingCoin.classList.add("coin-fall");
          fallingCoin.style.left = `${hamster.getBoundingClientRect().left + 50 + (Math.random() * 60 - 30)}px`;
          fallingCoin.style.top = `${hamster.getBoundingClientRect().top}px`;
          coinContainer.appendChild(fallingCoin);
          setTimeout(() => fallingCoin.remove(), 1000);
        }
      }
    });
  }
});
