// src/pages/UpdateTaskPage.jsx
import React from 'react';

function UpdateTaskPage() {
  return (
    <div className="container mt-5">
      <h2>Atualizar Tarefa</h2>
      <p>Aqui você pode editar os detalhes de uma tarefa existente.</p>
      {/* Aqui você colocaria o formulário de atualização de tarefas */}
      <form>
        <div className="mb-3">
          <label htmlFor="taskId" className="form-label">ID da Tarefa</label>
          <input type="text" className="form-control" id="taskId" placeholder="Digite o ID da tarefa para buscar" />
        </div>
        <div className="mb-3">
          <label htmlFor="taskNameUpdate" className="form-label">Novo Nome</label>
          <input type="text" className="form-control" id="taskNameUpdate" />
        </div>
        <button type="submit" className="btn btn-warning">Atualizar Tarefa</button>
      </form>
    </div>
  );
}

export default UpdateTaskPage;