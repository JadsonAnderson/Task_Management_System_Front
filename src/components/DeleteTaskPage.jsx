import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DeleteTaskPage({ idTask, onTaskDeleted, onCancel }) {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Novo estado para o processo de exclusão

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
    if (!task || isDeleting) return; // Impede múltiplas exclusões

    setIsDeleting(true);
    setMessage('');
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/tasks/${idTask}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage(`Tarefa "${task.title}" (ID: ${task.id}) apagada com sucesso!`);
        // Chama a função passada por prop para notificar o App.jsx
        // e possivelmente atualizar a lista de tarefas
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
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Carregando detalhes da tarefa para exclusão...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        {onCancel && <button className="btn btn-secondary mt-3" onClick={onCancel}>Voltar</button>}
      </div>
    );
  }

  if (!idTask) {
    return (
      <div className="container mt-5 alert alert-info">
        <p>Por favor, selecione uma tarefa para apagar na listagem.</p>
        {onCancel && <button className="btn btn-secondary mt-3" onClick={onCancel}>Voltar para a Listagem</button>}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Apagar Tarefa</h2>
      <p>Você tem certeza que deseja apagar a seguinte tarefa?</p>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      {task && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">**{task.title}** (ID: {task.id})</h5>
            <p className="card-text">**Descrição:** {task.description || 'N/A'}</p>
            <p className="card-text">**Data:** {task.date}</p>
            <p className="card-text">**Hora:** {task.hour}</p>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-start gap-2">
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={isDeleting || !task || message.includes('sucesso')} // Desabilita se estiver apagando ou já apagou
        >
          {isDeleting ? 'Apagando...' : 'Confirmar Exclusão'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={onCancel} // Volta para a página anterior
          disabled={isDeleting}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

DeleteTaskPage.propTypes = {
  idTask: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onTaskDeleted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteTaskPage;