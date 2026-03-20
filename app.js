const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('config/config');

const { Sequelize } = require('sequelize');
const sequelize = require('./models').sequelize;
const Todo = require('./models').Todo;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  await todo.destroy();
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));