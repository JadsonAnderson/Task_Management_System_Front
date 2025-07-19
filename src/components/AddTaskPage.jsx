import { useState } from 'react';
import PropTypes from 'prop-types';

function AddTaskPage( {onCreateTaskSuccess} ) {
  // Estados para armazenar os dados do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // Formato 'YYYY-MM-DD' para LocalDate no Spring
  const [hour, setHour] = useState(''); // Formato 'HH:MM' ou 'HH:MM:SS' para LocalTime no Spring
  const [message, setMessage] = useState(''); // Para feedback ao usuário

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

     if (!title.trim() || !date.trim() || !hour.trim()) { // Removido !description.trim()
      setMessage('Lembre de preencher todos os campos: Título, Data e Hora são obrigatórios!');
      return; // Interrompe a função se a validação falhar
    }

    const newTask = {
      title: title,
      // Se a descrição estiver vazia, envie null. Caso contrário, envie o valor.
      description: description.trim() === '' ? null : description,
      date: date, // 'YYYY-MM-DD'
      hour: hour + ':00', // Adiciona ':00' para formar 'HH:MM:SS'
    };

    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST', // Método HTTP para criar um novo recurso
        headers: {
          'Content-Type': 'application/json', // Informa que está sendo enviado JSON
          // Adicione cabeçalhos de autenticação/autorização se necessário
        },
        body: JSON.stringify(newTask), // Converte o objeto para JSON
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Tarefa "${data.title}" (ID: ${data.id}) cadastrada com sucesso!`);
        // Limpar os campos após o sucesso
        setTitle('');
        setDescription('');
        setDate('');
        setHour('');
        // Chama a função de callback se ela for fornecida
        if (onCreateTaskSuccess) {
            onCreateTaskSuccess();
        }
      } else {
        // Se a resposta não for OK, tenta ler a mensagem de erro do backend
        const errorData = await response.json();
        setMessage(`Erro ao cadastrar tarefa: ${errorData.message || 'Todos os campos são obrigatórios'}`);
        console.error('Erro ao cadastrar tarefa:', errorData);
      }
    } catch (err) {
      // Captura erros de rede ou outros problemas na requisição
      setMessage(`Erro de conexão: ${err.message}`);
      console.error('Erro na requisição POST:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Nova Tarefa</h2>
      <p>Preencha os dados abaixo para adicionar uma nova tarefa.</p>

      {/* Exibir mensagem de sucesso ou erro */}
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
            required // Atributo HTML para validação básica no navegador
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Descrição (Opcional)</label>
          <textarea
            className="form-control"
            id="taskDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="500"
            // Não 'required' para ser opcional
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
            required // Atributo HTML para validação básica no navegador
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
            required // Atributo HTML para validação básica no navegador
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}

AddTaskPage.propTypes = {
    onCreateTaskSuccess: PropTypes.func, // O PropTypes já está correto para 'onCreateTaskSuccess'
};

export default AddTaskPage;