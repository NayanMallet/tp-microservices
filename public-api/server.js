const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from public API' });
});

app.listen(PORT, () => {
  console.log(`Public API listening on port ${PORT}`);
});
