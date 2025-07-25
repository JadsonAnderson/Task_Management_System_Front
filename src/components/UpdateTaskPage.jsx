import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function UpdateTaskPage({ idTask, onUpdateTaskSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!idTask) {
        setMessage('Nenhum ID de tarefa fornecido para atualização.');
        return;
      }

      setIsLoading(true);
      setError(null);
      setMessage('');

      try {
        const response = await fetch(`http://localhost:8080/tasks/${idTask}`);
        if (response.ok) {
          const taskData = await response.json();
          setTitle(taskData.title);
          setDescription(taskData.description || ''); // Garante que a descrição não seja 'null'
          setDate(taskData.date);
          setHour(taskData.hour.substring(0, 5));
        } else {
          const errorData = await response.json();
          setError(`Erro ao carregar tarefa: ${errorData.message || 'Tarefa não encontrada.'}`);
        }
      } catch (err) {
        setError(`Erro de conexão ao carregar tarefa: ${err.message}`);
        console.error('Erro ao buscar tarefa:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [idTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !date.trim() || !hour.trim()) {
      setMessage('Título, data e hora são obrigatórios!');
      return;
    }

    const updatedTask = {
      title: title,
      description: description.trim() === '' ? null : description,
      date: date,
      hour: hour + ':00',
    };

    try {
      const response = await fetch(`http://localhost:8080/tasks/${idTask}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Tarefa "${data.title}" (ID: ${data.id}) atualizada com sucesso!`);
        if (onUpdateTaskSuccess) {
          onUpdateTaskSuccess(); // Chama o callback de sucesso
        }
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao atualizar tarefa: ${errorData.message || 'Lembre-se de preencher todos os campos'}`);
        console.error('Erro ao atualizar tarefa:', errorData);
      }
    } catch (err) {
      setMessage(`Erro de conexão: ${err.message}`);
      console.error('Erro na requisição PUT:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Carregando tarefa...</p>
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
      </div>
    );
  }

  if (!idTask) {
      return (
          <div className="container mt-5 alert alert-info">
              <p>Por favor, forneça o ID da tarefa que deseja atualizar na página de <button className="btn btn-link p-0" onClick={() => window.location.reload()}>Visualizar Tarefas</button>.</p>
          </div>
      );
  }

  return (
    <div className="container mt-5">
      <h2>Atualizar Tarefa (ID: {idTask})</h2>
      <p>Edite os campos abaixo para atualizar a tarefa.</p>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="100"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Descrição</label>
          <textarea
            className="form-control"
            id="taskDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="500"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="taskDate" className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            id="taskDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskHour" className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            id="taskHour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">Atualizar Tarefa</button>
      </form>
    </div>
  );
}

UpdateTaskPage.propTypes = {
  idTask: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdateTaskSuccess: PropTypes.func.isRequired,
};

export default UpdateTaskPage;