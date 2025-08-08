import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Opções de Status e Prioridade para as caixas de seleção
const STATUS_OPTIONS = [
  { value: "Pendente", label: "Pendente" },
  { value: "Em_andamento", label: "Em andamento" },
  { value: "Concluida", label: "Concluída" },
];

const PRIORITY_OPTIONS = [
  { value: "Baixa", label: "Baixa" },
  { value: "Media", label: "Média" },
  { value: "Alta", label: "Alta" },
];

// Definição de categorias das tarefas (reutilizando do ListTasksPage)
const CATEGORIES = [
  { id: 'Pessoal', name: 'Pessoal', color: '#ffc107' },
  { id: 'Trabalho', name: 'Trabalho', color: '#17a2b8' },
  { id: 'Estudos', name: 'Estudos', color: '#007bff' }
];

function UpdateTaskPage({ idTask, onUpdateTaskSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState(''); // NOVO: Estado para a categoria
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
          // setStatus(taskData.status || STATUS_OPTIONS[0].value);
          // setPriority(taskData.priority || PRIORITY_OPTIONS[0].value);

          // Mapeia o status do backend para o formato do frontend
          const frontEndStatus = STATUS_OPTIONS.find(opt => opt.value.toUpperCase() === taskData.status)
                                              ?.value || STATUS_OPTIONS[0].value;

          setStatus(frontEndStatus);

          // Mapeia a prioridade do backend para o formato do frontend
          const frontendPriority = PRIORITY_OPTIONS.find(opt => opt.value.toUpperCase() === taskData.priority)
                                                  ?.value || PRIORITY_OPTIONS[0].value;
          setPriority(frontendPriority);
          
          // Carrega a categoria do localStorage
          const savedCategory = localStorage.getItem(`task_category_${idTask}`);
          setCategory(savedCategory || CATEGORIES[0].id);

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

    if (!title.trim() || !date.trim() || !hour.trim() || !status || !priority) {
      setMessage('Título, data e hora são obrigatórios!');
      return;
    }

    const updatedTask = {
      title: title,
      description: description.trim() === '' ? null : description,
      date: date,
      hour: hour,
      // Conversão do status de volta para o estado do backend
      status: status.toUpperCase(),
      // Conversão da prioridade de volta para o estado do backend
      priority: priority.toUpperCase(),
    };

    try {
      // Salva a categoria no localStorage antes de enviar a requisição
      localStorage.setItem(`task_category_${idTask}`, category);

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

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="taskStatus" className="form-label">Status (Obrigatório)</label>
            <select
              id="taskStatus"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="taskPriority" className="form-label">Prioridade (Obrigatório)</label>
            <select
              id="taskPriority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="taskCategory" className="form-label">Categoria</label>
            <select
              id="taskCategory"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
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