import { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [titleError, setTitleError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const isEditing = !!initialData;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('O título é obrigatório.');
      return;
    }

    setTitleError('');
    setSubmitError('');
    setSubmitting(true);

    try {
      await onSubmit({ title: title.trim(), description });
      if (!isEditing) {
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      const msg = err?.response?.data?.error || 'Erro ao salvar tarefa.';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>

      {submitError && <p className={styles.submitError}>{submitError}</p>}

      <div className={styles.field}>
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError) setTitleError('');
          }}
          placeholder="Digite o título da tarefa"
        />
        {titleError && <span className={styles.error}>{titleError}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição opcional"
          rows={3}
        />
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}
        </button>
      </div>
    </form>
  );
}
