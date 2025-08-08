import { useState } from 'react';
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

// Definição de categorias das tarefas
const CATEGORIES = [
  { id: 'Pessoal', name: 'Pessoal', color: '#ffc107' },
  { id: 'Trabalho', name: 'Trabalho', color: '#17a2b8' },
  { id: 'Estudos', name: 'Estudos', color: '#007bff' }
];

function AddTaskPage( {onCreateTaskSuccess} ) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS[0].value);
  const [priority, setPriority] = useState(PRIORITY_OPTIONS[0].value);
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const allFieldsEmpty = !title.trim() && !description.trim() && !date.trim() && !hour.trim();

    // if (allFieldsEmpty) {
    //   setMessage('Lembre de preencher todos os campos: Título, Descrição, Data e Hora são obrigatórios!');
    //   return;
    // }

    if (!title.trim() || !description.trim() || !date.trim() || !hour.trim()) {
      setMessage('Título, Descrição, Data e Hora são obrigatórios!');
      return;
    }

    const newTask = {
      title: title,
      description: description.trim() === '' ? null : description,
      date: date,
      hour: hour,
      status: status.toUpperCase(),
      priority: priority.toUpperCase(),
    };

    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const data = await response.json();
        // Salva a categoria no localstorage após o sucesso
        localStorage.setItem(`task_category_${data.id}`, category);
        setMessage(`Tarefa "${data.title}" (ID: ${data.id}) cadastrada com sucesso!`);
        setTitle('');
        setDescription('');
        setDate('');
        setHour('');
        setStatus(STATUS_OPTIONS[0].value);
        setPriority(PRIORITY_OPTIONS[0].value);
        setCategory(CATEGORIES[0].id);  // Limpa o campo de categoria
        if (onCreateTaskSuccess) {
          onCreateTaskSuccess();
        }
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao cadastrar tarefa: ${errorData.message || 'Houve um problema ao cadastrar. Verifique os dados.'}`);
        console.error('Erro ao cadastrar tarefa:', errorData);
      }
    } catch (err) {
      setMessage(`Erro de conexão: ${err.message}`);
      console.error('Erro na requisição POST:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Nova Tarefa</h2>
      <p>Preencha os dados abaixo para adicionar uma nova tarefa.</p>
      <h4>Todos os campos são obrigatórios</h4>
      <br/> 

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
          <label htmlFor="taskDescription" className="form-label">Descrição (Obrigatório)</label>
          <textarea
            className="form-control"
            id="taskDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="500"
            required
          ></textarea>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
          {/* Campo de seleção para categoria */}
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
              ))};
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
        <button type="submit" className="btn btn-primary">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}

AddTaskPage.propTypes = {
    onCreateTaskSuccess: PropTypes.func,
};

export default AddTaskPage;