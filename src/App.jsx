import { useState } from "react";
import BaseBoard from "./components/BaseBoard";
import UserLogPage from "./pages/UserLogPage";
import NavBarLog from "./components/NavBarLog";
import PageAddUserLog from "./components/PageAddUserLog";

// Utils
const PAGE_VIEWS = {
  HOME: "home",
  VIEW_LOGS: "viewLogs",
  ADD_LOGS: "addLogs",
  // ... outras páginas
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

  // Função para renderizar o conteúdo da página principal com base no estado
  const renderMainContent = () => {
    switch (currentPage) {
      case PAGE_VIEWS.VIEW_LOGS:
        return <UserLogPage />;
      case PAGE_VIEWS.ADD_LOGS:
        return <PageAddUserLog />;
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
        onAdicionarUsuariosClick={handleShowAddUserLogPage} // <--- NOVO: Passe a nova função
      />

      <div style={{ flexGrow: 1 }}>
        {renderMainContent()}{" "}
        {/* Chama a função que renderiza a página atual */}
      </div>

      <BaseBoard />
    </div>
  );
}

export default App;
