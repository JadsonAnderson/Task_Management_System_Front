// src/pages/DeleteTaskPage.jsx
import React from 'react';

function DeleteTaskPage() {
  return (
    <div className="container mt-5">
      <h2>Apagar Tarefa</h2>
      <p>Confirme a exclusão de uma tarefa.</p>
      {/* Aqui você colocaria a interface para apagar tarefas */}
      <div className="mb-3">
        <label htmlFor="taskIdDelete" className="form-label">ID da Tarefa a ser Apagada</label>
        <input type="text" className="form-control" id="taskIdDelete" />
      </div>
      <button type="button" className="btn btn-danger">Confirmar Exclusão</button>
    </div>
  );
}

export default DeleteTaskPage;