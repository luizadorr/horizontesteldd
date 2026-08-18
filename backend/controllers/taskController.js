const Task = require('../models/task');

function listTasks(req, res) {
  res.json(Task.listarTasks());
}

function getTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = Task.listarporId(id);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
}

function createTask(req, res) {
  const { title, description } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'O título é obrigatório' });
  }
  const task = Task.criarTask({ title: title.trim(), description });
  res.status(201).json(task);
}

function updateTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;

  if (title !== undefined && (!title || !title.trim())) {
    return res.status(400).json({ error: 'O título não pode ser vazio' });
  }

  const changes = {};
  if (title !== undefined) changes.title = title.trim();
  if (description !== undefined) changes.description = description;
  if (completed !== undefined) changes.completed = completed;

  const task = Task.update(id, changes);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
}

function deleteTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const deleted = Task.deleteTask(id);
  if (!deleted) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.status(204).json({ message: 'Tarefa deletada com sucesso' });
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
