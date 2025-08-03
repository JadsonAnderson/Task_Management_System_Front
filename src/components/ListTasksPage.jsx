import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Definição para status e prioridade para os filtros
const STATUS_OPTIONS = [
  { value: "all", label: "Todos os status" },
  { value: "pending", label: "Pendente" },
  { value: "in_progress", label: "Em andamento" },
  { value: "completed", label: "Concluída" },
]

const PRIORITY_OPTIONS = [
  { value: "all", label: "Todas as prioridades" },
  { value: "high", label: "Alta" },
  { value: "medium", label: "Média" },
  { value: "low", label: "Baixa" },
]

function ListTasksPage({ onEditTask, onDeleteTask, onTaskCreatedOrUpdatedOrDeleted }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idInput, setIdInput] = useState('');
  const [message, setMessage] = useState('');

  // Novos estados para os filtros
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

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

  // Lógica de filtro: cria uma nova lista com base nos estados do fitro
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

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

      {/* Seção de Filtros */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="card-title">Filtrar tarefas</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="statusFilter" className="form-label">Status</label>
            <select
              id="statusFilter"
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="priorityFilter" className="form-label">Prioridade</label>
            <select
              id="priorityFilter"
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Seção para input de ID e botões de ação */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="card-title">Gerenciar tarefa por ID</h5>
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
          >
            Atualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteById}
          >
            Apagar
          </button>
        </div>
      </div>

      <h3 className="mt-4">Tarefas cadastradas</h3>
      {filteredTasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Nenhuma tarefa encontrada com os filtros selecionados.
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Título</th>
              <th scope="col">Descrição</th>
              <th scope="col">Status</th>
              <th scope="col">Prioridade</th>
              <th scope="col">Data</th>
              <th scope="col">Hora</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <th scope="row">{task.id}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
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