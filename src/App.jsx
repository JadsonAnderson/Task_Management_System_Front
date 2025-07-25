import { useState } from "react";
import BaseBoard from "./components/BaseBoard";
import NavBarLog from "./components/NavBarLog";
import AddTaskPage from "./components/AddTaskPage";
import UpdateTaskPage from "./components/UpdateTaskPage";
import DeleteTaskPage from "./components/DeleteTaskPage";
import ListTasksPage from "./components/ListTasksPage";

const PAGE_VIEWS = {
  HOME: "home",
  ADD_TASK: "addTask",
  VIEW_TASKS: "viewTasks",
  UPDATE_TASK: "updateTask",
  DELETE_TASK: "deleteTask",
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGE_VIEWS.HOME);
  const [taskToUpdateId, setTaskToUpdateId] = useState(null);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const [shouldReloadTasks, setShouldReloadTasks] = useState(false); // Novo estado para recarregar lista

  // Função para mostrar a página de adicionar tarefa
  const handleShowAddTaskPage = () => {
    setCurrentPage(PAGE_VIEWS.ADD_TASK);
    setShouldReloadTasks(false); // Garante que não recarregue imediatamente
  };

  // Função para mostrar a página de visualizar tarefas (listagem)
  const handleShowViewTasksPage = () => {
    setCurrentPage(PAGE_VIEWS.VIEW_TASKS);
    setTaskToUpdateId(null); // Limpa IDs ao ir para a visualização
    setTaskToDeleteId(null);
    setShouldReloadTasks(true); // Sinaliza para recarregar a lista
  };

  // Funções passadas para ListTasksPage para iniciar Atualização/Exclusão
  const handleEditTask = (id) => {
    setTaskToUpdateId(id);
    setCurrentPage(PAGE_VIEWS.UPDATE_TASK);
  };

  // Função para apagar uma tarefa
  const handleDeleteTask = (id) => {
    setTaskToDeleteId(id);
    setCurrentPage(PAGE_VIEWS.DELETE_TASK);
  };

  // Callback para quando uma tarefa é ADICIONADA com sucesso
  const handleAddTaskSuccess = () => {
    setShouldReloadTasks(true); // Sinaliza para recarregar a lista (no ListTasksPage)
  };

  // Função de callback após uma tarefa ser ATUALIZADA/DELETADA
  const handleUpdateOrDeleteTaskCompleted = () => {
    setTaskToUpdateId(null);
    setTaskToDeleteId(null);
    setCurrentPage(PAGE_VIEWS.VIEW_TASKS); // Volta para a lista
    setShouldReloadTasks(true); // Sinaliza para recarregar a lista
  };

  // Função para cancelar a exclusão de uma tarefa
  const handleCancelDelete = () => {
    setTaskToDeleteId(null);
    setCurrentPage(PAGE_VIEWS.VIEW_TASKS); // Volta para a lista
    setShouldReloadTasks(true); // Sinaliza para recarregar a lista
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case PAGE_VIEWS.ADD_TASK:
        // Passa a nova função de callback específica para adicionar
        return <AddTaskPage onCreateTaskSuccess={handleAddTaskSuccess} />;
      case PAGE_VIEWS.VIEW_TASKS:
        return (
          <ListTasksPage
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onTaskCreatedOrUpdatedOrDeleted={shouldReloadTasks} // Passa o estado para recarregar
          />
        );
      case PAGE_VIEWS.UPDATE_TASK:
        if (taskToUpdateId) {
          // Usa a função de callback para atualização
          return <UpdateTaskPage idTask={taskToUpdateId} onUpdateTaskSuccess={handleUpdateOrDeleteTaskCompleted} />;
        } else {
          return (
            <div className="container mt-5 alert alert-info">
              <p>Por favor, selecione uma tarefa para editar na <button className="btn btn-link p-0" onClick={handleShowViewTasksPage}>Visualizar Tarefas</button>.</p>
            </div>
          );
        }
      case PAGE_VIEWS.DELETE_TASK:
        if (taskToDeleteId) {
          // Usa a função de callback para exclusão
          return <DeleteTaskPage idTask={taskToDeleteId} onTaskDeleted={handleUpdateOrDeleteTaskCompleted} onCancel={handleCancelDelete} />;
        } else {
          return (
            <div className="container mt-5 alert alert-info">
              <p>Por favor, selecione uma tarefa para apagar na <button className="btn btn-link p-0" onClick={handleShowViewTasksPage}>Visualizar Tarefas</button>.</p>
            </div>
          );
        }
      case PAGE_VIEWS.HOME:
      default:
        return (
          <div className="container mt-5">
            <h1>Bem-vindo ao Gerenciador de Tarefas!</h1>
            <p>Selecione uma opção no menu acima para começar.</p>
          </div>
        );
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavBarLog
        onAddTaskClick={handleShowAddTaskPage}
        onViewTasksClick={handleShowViewTasksPage}
      />

      <div style={{ flexGrow: 1 }}>
        {renderMainContent()}
      </div>

      <BaseBoard />
    </div>
  );
}

export default App;