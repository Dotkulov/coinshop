const paymentButtons = document.querySelectorAll('.payment--options button');
const form = document.querySelector('.form');

const name = document.getElementById('card_name');
const card = document.getElementById('card_number');
const expiry = document.getElementById('card_expiry');
const cvv = document.getElementById('card_cvv');

const cardSection = document.querySelector('.credit-card-info--form');
const qrSection = document.querySelector('.qr-payment');

const loader = document.querySelector('.loader');
const overlayPayment = document.getElementById('fullscreen-overlay');
const audioPayment = document.getElementById('payment-audio');

let selectedPayment = null;

// Выбор способа оплаты
paymentButtons.forEach(button => {
  button.addEventListener('click', () => {
    paymentButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedPayment = button.name;

    if (selectedPayment === 'qr') {
      cardSection.classList.add('hidden');
      qrSection.classList.remove('hidden');
    } else {
      cardSection.classList.remove('hidden');
      qrSection.classList.add('hidden');
    }
  });
});

// Формат номера карты
card.addEventListener('input', () => {
  card.value = card.value.replace(/\D/g, '').slice(0, 16);
});

// Формат срока действия
expiry.addEventListener('input', () => {
  let val = expiry.value.replace(/[^\d]/g, '').slice(0, 4);
  expiry.value = val.length > 2 ? val.slice(0, 2) + '/' + val.slice(2) : val;
});

// Двойной клик по CVV
cvv.addEventListener('dblclick', () => {
  cvv.type = cvv.type === 'password' ? 'text' : 'password';
});

// Обработка формы
form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;
  [name, card, expiry, cvv].forEach(input => input.classList.remove('error'));

  if (!selectedPayment) {
    alert("⚠️ Пожалуйста, выберите способ оплаты.");
    return;
  }

  if (selectedPayment !== 'qr') {
    if (!name.value.trim().match(/^[А-Яа-яA-Za-z]+\s+[А-Яа-яA-Za-z]+/)) {
      name.classList.add('error');
      isValid = false;
    }

    if (!card.value.match(/^\d{16}$/)) {
      card.classList.add('error');
      isValid = false;
    }

    if (!expiry.value.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      expiry.classList.add('error');
      isValid = false;
    }

    if (!cvv.value.match(/^\d{3}$/)) {
      cvv.classList.add('error');
      isValid = false;
    }
  }

  if (!isValid) {
    alert("🚫 Пожалуйста, заполните все поля корректно.");
    return;
  }

  loader.style.display = 'block';

  setTimeout(() => {
    loader.style.display = 'none';
    overlayPayment.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    audioPayment.play();

    // событие звука
    audioPayment.onended = () => {
      overlayPayment.style.display = 'none';
      document.body.style.overflow = 'auto';
      window.location.href = 'index.html';
    };

    if (selectedPayment !== 'qr') {
      form.reset();
      paymentButtons.forEach(btn => btn.classList.remove('active'));
      selectedPayment = null;
      cardSection.classList.remove('hidden');
      qrSection.classList.add('hidden');
    }
  }, 1500);
});

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo-icon");
  const overlay = document.getElementById("logo-fullscreen");
  const audio = document.getElementById("nero-audio");

  if (logo && overlay && audio) {
    logo.style.cursor = "pointer";

    logo.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      overlay.style.display = "flex";
      audio.currentTime = 0;
      audio.play();
    });

    audio.onended = () => {
      window.location.href = "/html/index.html";
    };
  }
});
