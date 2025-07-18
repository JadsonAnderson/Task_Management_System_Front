// src/pages/AddTaskPage.jsx
import React from 'react';

function AddTaskPage() {
  return (
    <div className="container mt-5">
      <h2>Cadastrar Nova Tarefa</h2>
      <p>Este é o formulário para adicionar uma nova tarefa.</p>
      {/* Aqui você colocaria o formulário de cadastro de tarefas */}
      <form>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Nome da Tarefa</label>
          <input type="text" className="form-control" id="taskName" />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Descrição</label>
          <textarea className="form-control" id="taskDescription" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Salvar Tarefa</button>
      </form>
    </div>
  );
}

export default AddTaskPage;