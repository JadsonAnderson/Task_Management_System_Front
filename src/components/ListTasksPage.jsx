// src/pages/ListTasksPage.jsx
import { useState, useEffect } from 'react'; // Adicionado useEffect e useState
import PropTypes from 'prop-types'; // Para validar as props

function ListTasksPage({ onEditTask, onDeleteTask }) { // Recebe onEditTask como prop
  const [tasks, setTasks] = useState([]); // Usar estado para as tarefas
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erros

    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/tasks'); // GET all tasks
        if (response.ok) {
          const data = await response.json();
          setTasks(data); // Atualiza o estado com as tarefas
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
    }, []); // Array de dependências vazio para rodar uma vez ao montar

    const handleReloadTasks = () => {
      fetchTasks();
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
            <button className="btn btn-info mt-3" onClick={handleReloadTasks}>Tentar Recarregar</button>
          </div>
        );
      }

      return (
        <div className="container mt-5">
          <h2>Listar Todas as Tarefas</h2>
          <p>Aqui está a lista de suas tarefas atuais:</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">Hora</th>
                <th scope="col">Ações</th>
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
                  <td>
                    <div className="d-flex gap-2"> {/* Para espaçar os botões */}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onEditTask(task.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteTask(task.id)} // Chama a nova prop
                      >
                        Apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tasks.length === 0 && !isLoading && !error && (
            <div className="alert alert-info mt-3" role="alert">
              Nenhuma tarefa encontrada. Que tal adicionar uma?
            </div>
          )}
        </div>
      );
    }

    ListTasksPage.propTypes = {
      onEditTask: PropTypes.func.isRequired,
      onDeleteTask: PropTypes.func.isRequired, // Nova validação de prop
    };

    export default ListTasksPage;