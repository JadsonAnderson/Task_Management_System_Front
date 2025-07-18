import { useState } from "react";
import BaseBoard from "./components/BaseBoard";
import UserLogPage from "./pages/UserLogPage";
import NavBarLog from "./components/NavBarLog";
import PageAddUserLog from "./components/PageAddUserLog";
import AddTaskPage from "./components/AddTaskPage";
import UpdateTaskPage from "./components/UpdateTaskPage";
import DeleteTaskPage from "./components/DeleteTaskPage";
import ListTasksPage from "./components/ListTasksPage";

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
  const [currentPage, setCurrentPage] = useState(PAGE_VIEWS.HOME);
  const [taskToUpdateId, setTaskToUpdateId] = useState(null);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

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
  const handleShowUpdateTaskPage = (id) => {
    setTaskToUpdateId(id); // Guarda o ID no estado
    setCurrentPage(PAGE_VIEWS.UPDATE_TASK);
  };

  // Função para apagar uma tarefa
  const handleShowDeleteTaskPage = (id) => {
    setTaskToDeleteId(id); // Guarda o ID da tarefa a ser apagada
    setCurrentPage(PAGE_VIEWS.DELETE_TASK);
  };

  // Função para listar uma tarefa
  const handleShowListTasksPage = () => {
    setTaskToUpdateId(null); // Limpa IDs ao ir para a lista
    setTaskToDeleteId(null);
    setCurrentPage(PAGE_VIEWS.LIST_TASKS);
  };

  // Callback para quando uma tarefa é apagada com sucesso
  const handleTaskDeleted = () => {
    setTaskToDeleteId(null); // Limpa o ID de exclusão
    setCurrentPage(PAGE_VIEWS.LIST_TASKS); // Volta para a lista atualizada
  };

   // Callback para cancelar a exclusão ou voltar de um erro
  const handleCancelDelete = () => {
    setTaskToDeleteId(null); // Limpa o ID de exclusão
    setCurrentPage(PAGE_VIEWS.LIST_TASKS); // Volta para a lista
  };

  // Função para renderizar o conteúdo da página principal com base no estado
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
          return (
            <div className="container mt-5 alert alert-info">
              <p>Por favor, selecione uma tarefa para editar na <button className="btn btn-link p-0" onClick={() => handleShowListTasksPage()}>Listagem de Tarefas</button>.</p>
            </div>
          );
        }
      case PAGE_VIEWS.DELETE_TASK:
        // Renderiza DeleteTaskPage SOMENTE SE taskToDeleteId NÃO FOR NULL.
        // Passa callbacks para quando a tarefa for apagada ou o usuário cancelar.
        if (taskToDeleteId) {
          return <DeleteTaskPage idTask={taskToDeleteId} onTaskDeleted={handleTaskDeleted} onCancel={handleCancelDelete} />;
        } else {
          return (
            <div className="container mt-5 alert alert-info">
              <p>Por favor, selecione uma tarefa para apagar na <button className="btn btn-link p-0" onClick={() => handleShowListTasksPage()}>Listagem de Tarefas</button>.</p>
            </div>
          );
        }
      case PAGE_VIEWS.LIST_TASKS:
        // Passa tanto a função de editar quanto a de apagar
        return <ListTasksPage onEditTask={handleShowUpdateTaskPage} onDeleteTask={handleShowDeleteTaskPage} />;
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
        // Os botões "Atualizar Tarefa" e "Apagar Tarefa" no NavBar
        // agora direcionam para a listagem para que o usuário possa selecionar.
        onAtualizarTarefaClick={handleShowListTasksPage}
        onApagarTarefaClick={handleShowListTasksPage} // Leva para a lista para escolher qual apagar
        onListarTarefasClick={handleShowListTasksPage}
      />

      <div style={{ flexGrow: 1 }}>
        {renderMainContent()}
      </div>

      <BaseBoard />
    </div>
  );
}

export default App;