import { useState } from "react";
import BaseBoard from "./components/BaseBoard";
import UserLogPage from "./pages/UserLogPage";
import NavBarLog from "./components/NavBarLog";
import PageAddUserLog from "./components/PageAddUserLog";
import AddTaskPage from "./components/AddTaskPage";
import UpdateTaskPage from "./components/UpdateTaskPage";
import DeleteTaskPage from "./components/DeleteTaskPage";
import ManageTasksPage from "./components/ManageTasksPages";
import ListTasksPage from "./components/ListTasksPage";

// Utils
const PAGE_VIEWS = {
  HOME: "home",
  VIEW_LOGS: "viewLogs",
  ADD_LOGS: "addLogs",
  ADD_TASK: "addTask",
  UPDATE_TASK: "updateTask",
  DELETE_TASK: "deleteTask",
  MANAGE_TASKS: "manageTasks",
  LIST_TASKS_ONLY: "listTasksOnly",
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGE_VIEWS.HOME);
  const [taskToUpdateId, setTaskToUpdateId] = useState(null);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const handleShowUserLogPage = () => {
    setCurrentPage(PAGE_VIEWS.VIEW_LOGS);
  };

  const handleShowAddUserLogPage = () => {
    setCurrentPage(PAGE_VIEWS.ADD_LOGS);
  };

  const handleShowAddTaskPage = () => {
    setCurrentPage(PAGE_VIEWS.ADD_TASK);
  };

  const handleShowUpdateTaskPage = (id) => {
    setTaskToUpdateId(id);
    setCurrentPage(PAGE_VIEWS.UPDATE_TASK);
  };

  const handleShowDeleteTaskPage = (id) => {
    setTaskToDeleteId(id);
    setCurrentPage(PAGE_VIEWS.DELETE_TASK);
  };

  const handleShowManageTasksPage = () => {
    setTaskToUpdateId(null);
    setTaskToDeleteId(null);
    setCurrentPage(PAGE_VIEWS.MANAGE_TASKS);
  };

  // Função para a nova página de listagem pura
  const handleShowListTasksOnlyPage = () => {
    setCurrentPage(PAGE_VIEWS.LIST_TASKS);
  };

  const handleTaskDeleted = () => {
    setTaskToDeleteId(null);
    // Após deletar, o ideal é voltar para a página de gerenciamento,
    // pois a página de "Listar" não tem ações de delete/update.
    setCurrentPage(PAGE_VIEWS.MANAGE_TASKS);
  };

  const handleCancelDelete = () => {
    setTaskToDeleteId(null);
    // Após cancelar, volta para a página de gerenciamento de tarefas
    setCurrentPage(PAGE_VIEWS.MANAGE_TASKS);
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case PAGE_VIEWS.VIEW_LOGS:
        return <UserLogPage />;
      case PAGE_VIEWS.ADD_LOGS:
        return <PageAddUserLog />;
      case PAGE_VIEWS.ADD_TASK:
        return <AddTaskPage />;
      case PAGE_VIEWS.UPDATE_TASK:
        if (taskToUpdateId) {
          return <UpdateTaskPage idTask={taskToUpdateId} />;
        } else {
          // Ajustado para redirecionar para ManageTasksPage, pois é onde se gerencia
          return (
            <div className="container mt-5 alert alert-info">
              <p>Por favor, selecione uma tarefa para editar na <button className="btn btn-link p-0" onClick={handleShowManageTasksPage}>Gerenciar Tarefas</button>.</p>
            </div>
          );
        }
      case PAGE_VIEWS.DELETE_TASK:
        if (taskToDeleteId) {
          return <DeleteTaskPage idTask={taskToDeleteId} onTaskDeleted={handleTaskDeleted} onCancel={handleCancelDelete} />;
        } else {
          // Ajustado para redirecionar para ManageTasksPage, pois é onde se gerencia
          return (
            <div className="container mt-5 alert alert-info">
              <p>Por favor, selecione uma tarefa para apagar na <button className="btn btn-link p-0" onClick={handleShowManageTasksPage}>Gerenciar Tarefas</button>.</p>
            </div>
          );
        }
      case PAGE_VIEWS.MANAGE_TASKS:
        return <ManageTasksPage onEditTask={handleShowUpdateTaskPage} onDeleteTask={handleShowDeleteTaskPage} />;
      case PAGE_VIEWS.LIST_TASKS_ONLY: // Novo caso para a página de listagem pura
        return <ListTasksPage />;
      case PAGE_VIEWS.HOME:
      default:
        return (
          <div className="container mt-5">
            <h1>Bem-vindo ao Gerenciador de Tarefas!</h1>
            <p>Selecione uma opção no menu acima.</p>
          </div>
        );
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavBarLog
        onVisualizarUsuariosClick={handleShowUserLogPage}
        onAdicionarUsuariosClick={handleShowAddUserLogPage}
        onCadastrarTarefaClick={handleShowAddTaskPage}
        // "Atualizar" e "Apagar" continuam levando para a página de gerenciamento
        onAtualizarTarefaClick={handleShowManageTasksPage}
        onApagarTarefaClick={handleShowManageTasksPage}
        // O botão "Listar" agora aponta para a nova página de listagem pura
        onListarTarefasClick={handleShowListTasksOnlyPage}
      />

      <div style={{ flexGrow: 1 }}>
        {renderMainContent()}
      </div>

      <BaseBoard />
    </div>
  );
}

export default App;