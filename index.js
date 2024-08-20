// index.js
const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use(express.json());
app.get('/', (req, res) => {
  res.json('Hello, World! This is your Express app running on Vercel!');
});

let items = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ];

  const pool = new Pool({
    connectionString: "postgres://default:6mWIXUZS5Jtl@ep-fragrant-salad-a1bjz4vb.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
    ssl: {
      rejectUnauthorized: false
    }
  });

  app.get('/item', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM items');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/item', async (req, res) => {
    const { name, description } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
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
