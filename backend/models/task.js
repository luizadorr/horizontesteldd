let tasks = [];
let nextId = 1;

function listarTasks() {
  return tasks;
}

function listarporId(id) {
  return tasks.find((t) => t.id === id) || null;
}

function criarTask({ title, description }) {
  const task = {
    id: nextId++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function update(id, data) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { listarTasks, listarporId, criarTask, update, deleteTask };
