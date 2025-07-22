import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ListTasksPage({ onEditTask, onDeleteTask, onTaskCreatedOrUpdatedOrDeleted }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idInput, setIdInput] = useState('');
  const [message, setMessage] = useState('');

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    setMessage('');
    try {
      const response = await fetch('http://localhost:8080/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        const errorData = await response.json();
        setError(`Erro ao carregar tarefas: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (err) {
      setError(`Erro de conexão: ${err.message}`);
      console.error('Erro ao buscar tarefas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para lidar com a atualização por ID
  const handleUpdateById = () => {
    if (idInput.trim()) {
      setMessage('');
      onEditTask(idInput);
    } else {
      setMessage('Por favor, digite um ID para atualizar.');
    }
  };

  // Função para lidar com a exclusão por ID
  const handleDeleteById = () => {
    if (idInput.trim()) {
      setMessage('');
      onDeleteTask(idInput);
    } else {
      setMessage('Por favor, digite um ID para apagar.');
    }
  };

  // Recarrega as tarefas quando uma operação de CRUD é bem-sucedida
  useEffect(() => {
    if (onTaskCreatedOrUpdatedOrDeleted) {
      fetchTasks();
    }
  }, [onTaskCreatedOrUpdatedOrDeleted]);

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Carregando tarefas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          {error}
        </div>
        <button className="btn btn-info mt-3" onClick={fetchTasks}>Tentar Recarregar</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Visualizar Tarefas</h2>
      <p>Abaixo está a lista completa de tarefas cadastradas.</p>

      {message && (
        <div className={`alert ${message.includes('Erro') ? 'alert-danger' : 'alert-info'}`} role="alert">
          {message}
        </div>
      )}

      {/* Seção para input de ID e botões de ação */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="card-title">Gerenciar por ID</h5>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Qual o ID da tarefa?"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
          <button
            className="btn btn-warning"
            onClick={handleUpdateById}
            // disabled={!idInput.trim()}
          >
            Atualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteById}
            // disabled={!idInput.trim()}
          >
            Apagar
          </button>
        </div>
      </div>

      <h3 className="mt-4">Tarefas Cadastradas</h3>
      {tasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Nenhuma tarefa encontrada.
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Título</th>
              <th scope="col">Descrição</th>
              <th scope="col">Data</th>
              <th scope="col">Hora</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <th scope="row">{task.id}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.date}</td>
                <td>{task.hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

ListTasksPage.propTypes = {
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onTaskCreatedOrUpdatedOrDeleted: PropTypes.bool,
};

export default ListTasksPage;