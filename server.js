const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Редирект на главную
app.get('/', (req, res) => {
  res.redirect('/html/index.html');
});

// Страницы
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

app.get('/oplata', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/oplata.html'));
});

// API товаров
app.get('/api/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/products.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      res.status(500).json({ error: 'Некорректный JSON' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}/html/index.html`);
});
