import { useState, useEffect, useCallback } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import styles from './Home.module.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError('Não foi possível carregar as tarefas. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCreate(data) {
    const task = await createTask(data);
    setTasks((prev) => [...prev, task]);
  }

  async function handleUpdate(data) {
    const updated = await updateTask(editingTask.id, data);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTask(null);
  }

  async function handleToggle(task) {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Minhas Tarefas</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.formSection}>
          <TaskForm
            key={editingTask?.id ?? 'new'}
            initialData={editingTask}
            onSubmit={editingTask ? handleUpdate : handleCreate}
            onCancel={editingTask ? () => setEditingTask(null) : null}
          />
        </section>

        <section className={styles.listSection}>
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditingTask}
          />
        </section>
      </main>
    </div>
  );
}
