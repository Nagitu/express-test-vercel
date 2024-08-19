// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json('Hello, World! This is your Express app running on Vercel!');
});

let items = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ];
  
  // Create - Menambahkan item baru
  app.post('/items', (req, res) => {
      const newItem = {
          id: items.length + 1,
          name: req.body.name,
          description: req.body.description,
      };
      items.push(newItem);
      res.status(201).json(newItem);
  });
  
  // Read - Mendapatkan semua item
  app.get('/items', (req, res) => {
      res.json(items);
  });
  
  // Read - Mendapatkan item berdasarkan ID
  app.get('/items/:id', (req, res) => {
      const item = items.find(i => i.id === parseInt(req.params.id));
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
  });
  
  // Update - Memperbarui item berdasarkan ID
  app.put('/items/:id', (req, res) => {
      const item = items.find(i => i.id === parseInt(req.params.id));
      if (!item) return res.status(404).json({ message: 'Item not found' });
  
      item.name = req.body.name || item.name;
      item.description = req.body.description || item.description;
      res.json(item);
  });
  
  // Delete - Menghapus item berdasarkan ID
  app.delete('/items/:id', (req, res) => {
      const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
      if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
  
      items.splice(itemIndex, 1);
      res.status(204).send();
  });
  

// Export the Express app as a module
module.exports = app;
