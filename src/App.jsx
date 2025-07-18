import { useState } from "react";
import BaseBoard from "./components/BaseBoard";
import UserLogPage from "./pages/UserLogPage";
import NavBarLog from "./components/NavBarLog";
import PageAddUserLog from "./components/PageAddUserLog";
import AddTaskPage from "./components/AddTaskPage";
import UpdateTaskPage from "./components/UpdateTaskPage";
import DeleteTaskPage from "./components/DeleteTaskPage";
import ListTaskPage from "./components/ListTaskPage";

// Utils
const PAGE_VIEWS = {
  HOME: "home",
  VIEW_LOGS: "viewLogs",
  ADD_LOGS: "addLogs",
  ADD_TASK: "addTask",
  UPDATE_TASK: "updateTask",
  DELETE_TASK: "deleteTask",
  LIST_TASKS: "listTasks",
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGE_VIEWS.HOME); // Começa na página inicial

  // Função para exibir a UserLogPage
  const handleShowUserLogPage = () => {
    setCurrentPage(PAGE_VIEWS.VIEW_LOGS);
  };

  // Função para exibir a PageAddUserLog
  const handleShowAddUserLogPage = () => {
    setCurrentPage(PAGE_VIEWS.ADD_LOGS);
  };

  // Função para cadastrar uma nova tarefa
  const handleShowAddTaskPage = () => {
    setCurrentPage(PAGE_VIEWS.ADD_TASK);
  };

  // Função para atualizar uma tarefa
  const handleShowUpdateTaskPage = () => {
    setCurrentPage(PAGE_VIEWS.UPDATE_TASK);
  };

  // Função para apagar uma tarefa
  const handleShowDeleteTaskPage = () => {
    setCurrentPage(PAGE_VIEWS.DELETE_TASK);
  };

  // Função para listar uma tarefa
  const handleShowListTasksPage = () => {
    setCurrentPage(PAGE_VIEWS.LIST_TASKS);
  };

  // Função para renderizar o conteúdo da página principal com base no estado
  const renderMainContent = () => {
    switch (currentPage) {
      case PAGE_VIEWS.VIEW_LOGS:
        return <UserLogPage />;
      case PAGE_VIEWS.ADD_LOGS:
        return <PageAddUserLog />;
      case PAGE_VIEWS.ADD_TASK:
        return <AddTaskPage/>
      case PAGE_VIEWS.UPDATE_TASK:
        return <UpdateTaskPage/>
      case PAGE_VIEWS.DELETE_TASK:
        return <DeleteTaskPage/>
      case PAGE_VIEWS.LIST_TASKS:
        return <ListTaskPage/>
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
        onAtualizarTarefaClick={handleShowUpdateTaskPage}
        onApagarTarefaClick={handleShowDeleteTaskPage}
        onListarTarefasClick={handleShowListTasksPage}
      />

      <div style={{ flexGrow: 1 }}>
        {renderMainContent()}
      </div>

      <BaseBoard />
    </div>
  );
}

export default App
