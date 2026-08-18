import styles from './TaskList.module.css';

export default function TaskList({ tasks, loading, error, onToggle, onDelete, onEdit }) {
  if (loading) {
    return <p className={styles.feedback}>Carregando tarefas…</p>;
  }

  if (error) {
    return <p className={`${styles.feedback} ${styles.errorText}`}>{error}</p>;
  }

  if (tasks.length === 0) {
    return <p className={styles.feedback}>Nenhuma tarefa ainda. Crie uma acima!</p>;
  }

  function confirmDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDelete(id);
    }
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
          <div className={styles.content}>
            <p className={styles.title}>{task.title}</p>
            {task.description && (
              <p className={styles.description}>{task.description}</p>
            )}
            <span className={`${styles.badge} ${task.completed ? styles.badgeDone : styles.badgePending}`}>
              {task.completed ? 'Concluída' : 'Pendente'}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.toggleBtn}
              onClick={() => onToggle(task)}
              title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
            >
              {task.completed ? 'Desfazer' : 'Concluir'}
            </button>
            <button
              className={styles.editBtn}
              onClick={() => onEdit(task)}
              title="Editar tarefa"
            >
              Editar
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => confirmDelete(task.id)}
              title="Excluir tarefa"
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
