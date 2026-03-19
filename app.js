const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Fake DB (en mémoire)
let todos = [
  { id: 1, title: "Apprendre Docker", done: false },
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    done: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ message: "Not found" });

  todo.done = !todo.done;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

