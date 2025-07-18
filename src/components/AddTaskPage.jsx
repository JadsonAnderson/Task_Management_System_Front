import { useState } from 'react';

function AddTaskPage() {
  // Estados para armazenar os dados do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // Formato 'YYYY-MM-DD' para LocalDate no Spring
  const [hour, setHour] = useState(''); // Formato 'HH:MM' ou 'HH:MM:SS' para LocalTime no Spring
  const [message, setMessage] = useState(''); // Para feedback ao usuário

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    if (!title.trim() || !date.trim() || !hour.trim()) {
      setMessage('Título, data e hora são obrigatórios!');
      return;
    }

    const newTaskRequestDTO = {
      title: title,
      description: description,
      date: date, // 'YYYY-MM-DD'
      hour: hour + ':00', // Adiciona segundos se seu LocalTime espera 'HH:MM:SS'
                         // Se seu LocalTime espera 'HH:MM', remova ':00'
    };

    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST', // Método HTTP para criar um novo recurso
        headers: {
          'Content-Type': 'application/json', // Informa que está sendo enviado JSON
          // Adicione cabeçalhos de autenticação/autorização se necessário
        },
        body: JSON.stringify(newTaskRequestDTO), // Converte o objeto para JSON
      });

      if (response.ok) {
        // Se o seu backend retorna TaskResponseDTO com a tarefa criada
        const taskResponseDTO = await response.json();
        setMessage(`Tarefa "${taskResponseDTO.title}" cadastrada com sucesso!`);
        
        // Limpar o formulário após o sucesso
        setTitle('');
        setDescription('');
        setDate('');
        setHour('');
      } else {
        // Se a requisição falhou (ex: status 4xx ou 5xx)
        const errorData = await response.json(); // Tenta ler a mensagem de erro do backend
        setMessage(`Erro ao cadastrar tarefa: ${errorData.message || 'Erro desconhecido'}`);
        console.error('Erro ao cadastrar tarefa:', errorData);
      }
    } catch (error) {
      // Lidar com erros de rede (ex: servidor não está rodando)
      setMessage(`Erro de conexão com o servidor: ${error.message}`);
      console.error('Erro na requisição fetch:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Nova Tarefa</h2>
      <p>Preencha os campos abaixo para adicionar uma nova tarefa.</p>

      {/* Exibe mensagens de feedback */}
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
            maxLength="100" // Corresponde ao `length = 100` na sua entidade
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
            maxLength="500" // Corresponde ao `length = 500` na sua entidade
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="taskDate" className="form-label">Data</label>
          <input
            type="date" // Input type para data
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
            type="time" // Input type para hora
            className="form-control"
            id="taskHour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar Tarefa</button>
      </form>
    </div>
  );
}

export default AddTaskPage;