import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ManageTasksPage({ onEditTask, onDeleteTask }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idInput, setIdInput] = useState(''); // Estado para o input do ID

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/tasks'); // GET all tasks
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

  // Funções para lidar com as ações via input de ID
  const handleUpdateById = () => {
    if (idInput) {
      onEditTask(idInput); // Chama a função para editar com o ID do input
    }
  };

  const handleDeleteById = () => {
    if (idInput && window.confirm(`Tem certeza que deseja apagar a tarefa com ID: ${idInput}?`)) {
      onDeleteTask(idInput); // Chama a função para deletar com o ID do input
    }
  };

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
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-info mt-3" onClick={fetchTasks}>Tentar Recarregar</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Gerenciar Tarefas</h2>
      <p>Visualize as tarefas cadastradas e utilize os campos abaixo para atualizar/apagar por ID.</p>

      {/* Seção para input de ID */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="card-title">Ações por ID</h5>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Digite o ID da tarefa"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
          <button
            className="btn btn-warning"
            onClick={handleUpdateById}
            disabled={!idInput}
          >
            Atualizar por ID
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteById}
            disabled={!idInput}
          >
            Apagar por ID
          </button>
        </div>
      </div>

      <h3 className="mt-4">Tarefas Cadastradas</h3>
      {tasks.length === 0 && !isLoading && !error ? (
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

ManageTasksPage.propTypes = {
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default ManageTasksPage;