const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/todos', (req, res) => {
  res.send('dd');
});

app.post('/api/todos', (req, res) => {
  res.send('dd');
});

app.patch('/api/todos/:id', (req, res) => {
  res.send('dd');
});

app.delete('/api/todos/:id', (req, res) => {
  res.send('dd');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});