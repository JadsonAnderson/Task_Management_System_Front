import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DeleteTaskPage({ idTask, onTaskDeleted, onCancel }) {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!idTask) {
        setError('Nenhum ID de tarefa fornecido para exclusão.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setMessage('');

      try {
        const response = await fetch(`http://localhost:8080/tasks/${idTask}`);
        if (response.ok) {
          const taskData = await response.json();
          setTask(taskData);
        } else {
          const errorData = await response.json();
          setError(`Erro ao carregar tarefa: ${errorData.message || 'Tarefa não encontrada.'}`);
        }
      } catch (err) {
        setError(`Erro de conexão ao carregar tarefa: ${err.message}`);
        console.error('Erro ao buscar tarefa para exclusão:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [idTask]);

  const handleDelete = async () => {
    if (!task || isDeleting) return;

    setIsDeleting(true);
    setMessage('');
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/tasks/${idTask}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage(`Tarefa "${task.title}" (ID: ${task.id}) apagada com sucesso!`);
        if (onTaskDeleted) {
          onTaskDeleted();
        }
      } else {
        const errorData = await response.json();
        setError(`Erro ao apagar tarefa: ${errorData.message || 'Erro desconhecido'}`);
        console.error('Erro ao apagar tarefa:', errorData);
      }
    } catch (err) {
      setError(`Erro de conexão: ${err.message}`);
      console.error('Erro na requisição DELETE:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Carregando tarefa para exclusão...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <p>Por favor, verifique o ID da tarefa ou tente novamente.</p>
        <button className="btn btn-secondary mt-3" onClick={onCancel}>Voltar</button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mt-5 alert alert-info">
        <p>Nenhuma tarefa encontrada para o ID fornecido.</p>
        <button className="btn btn-secondary mt-3" onClick={onCancel}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Confirmação de Exclusão</h2>
      <div className="alert alert-warning" role="alert">
        <p>Você tem certeza que deseja apagar a tarefa abaixo?</p>
        <p>
          <strong>ID:</strong> {task.id} <br />
          <strong>Título:</strong> {task.title} <br />
          <strong>Descrição:</strong> {task.description || 'N/A'} <br />
          <strong>Data:</strong> {task.date} <br />
          <strong>Hora:</strong> {task.hour}
        </p>
      </div>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <button
        className="btn btn-danger me-2"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Apagando...' : 'Sim, Apagar'}
      </button>
      <button
        className="btn btn-secondary"
        onClick={onCancel}
        disabled={isDeleting}
      >
        Cancelar
      </button>
    </div>
  );
}

DeleteTaskPage.propTypes = {
  idTask: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteTaskPage;