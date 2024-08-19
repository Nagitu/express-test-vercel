// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express app running on Vercel!');
});

// Export the Express app as a module
module.exports = app;
