const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
let cart = [];
let products = [];

// Загрузка товаров из JSON
fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts("all");
  })
  .catch(err => {
    productsEl.innerHTML = "<p>Ошибка загрузки товаров</p>";
    console.error("Ошибка загрузки:", err);
  });

  function renderProducts(category = "all") {
    productsEl.innerHTML = "";
  
    const filtered = products.filter(p => category === "all" || p.category === category);
  
    //Случайная расстановка товаров 
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
  
    filtered.forEach(p => {
      const el = document.createElement("div");
      el.className = "product";
      el.innerHTML = `
        <div class="image-box">
          <img src="${p.image1}" class="front" alt="${p.name}">
          <img src="${(p.image2 || p.image1).trim()}" class="back" alt="${p.name}">
        </div>
        <h3>${p.name}</h3>
        <p><strong>${p.price} ₽</strong></p>
        <div class="container">
          <button onclick="addToCart('${p.name}')">Добавить</button>
        </div>
      `;
      productsEl.appendChild(el);
    });
  }
  

function addToCart(name) {
  cart.push(name);
  renderCart();

  const note = document.createElement("div");
  note.textContent = `${name} добавлен в корзину`;
  note.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  `;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2000);
}

function renderCart() {
  cartEl.innerHTML = cart.map(item => `<li>${item}</li>`).join("");
}

function filter(category) {
  renderProducts(category);
  document.querySelectorAll('.categories button').forEach(btn =>
    btn.classList.toggle("active", btn.textContent.toLowerCase().includes(category))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const secretBtn = document.getElementById("secret-video-btn");
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("secret-video");

  if (secretBtn && modal && video) {
    // Прекращаем проигрывание на всякий случай
    video.pause();
    video.currentTime = 0;

    secretBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      video.currentTime = 0;
      video.play();

      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });

    video.addEventListener("ended", () => {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      window.location.href = "/html/index.html";
    });
  }
});
