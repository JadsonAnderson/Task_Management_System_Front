// src/pages/ListTasksPage.jsx
import React from 'react';

function ListTasksPage() {
  // Exemplo de dados de tarefas (você buscará isso de uma API real)
  const tasks = [
    { id: 1, name: 'Comprar Leite', description: 'Leite integral e desnatado' },
    { id: 2, name: 'Pagar Contas', description: 'Água, luz e internet' },
    { id: 3, name: 'Estudar React', description: 'Praticar hooks e componentes' },
  ];

  return (
    <div className="container mt-5">
      <h2>Listar Todas as Tarefas</h2>
      <p>Aqui está a lista de suas tarefas atuais:</p>
      {/* Aqui você exibiria a lista de tarefas, talvez em uma tabela */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <th scope="row">{task.id}</th>
              <td>{task.name}</td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTasksPage;