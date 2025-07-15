// src/pages/UserLogPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableLog from "../components/TableLog";
import PaginationControls from "../components/PaginationControls";

function UserLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controle da paginação
  const [currentPage, setCurrentPage] = useState(0); // Página atual (0-indexed para Spring Boot)
  const [pageSize, setPageSize] = useState(10); // Quantidade de itens por página
  const [totalPages, setTotalPages] = useState(0); // Total de páginas retornado pelo backend
  const [totalElements, setTotalElements] = useState(0); // Total de elementos retornado pelo backend

  // URL base do endpoint do backend
  const API_BASE_URL = "http://localhost:8080/UserLogController/search-all";

  // Função para buscar os logs da API com paginação
  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios vai automaticamente adicionar os parâmetros como ?page=X&size=Y&sort=Z
      const response = await axios.get(`${API_BASE_URL}`, {
        params: {
          page: currentPage,
          size: pageSize,
          sort: "idLog,ASC", // Usando 'IdLog' conforme seu DTO. Pode ser 'IdLog,desc' também.
          // Se 'idLog' (i minúsculo) funcionar na entidade, use-o.
        },
      });
      console.log("Request de pageable enviada: ", response);
      // A resposta do Spring Pageable vem com o conteúdo em 'data.content'
      // e metadados de paginação em 'data.totalPages', 'data.totalElements', etc.
      setLogs(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);

      console.log("Logs carregados:", response.data);
    } catch (err) {
      console.error("Erro ao carregar logs:", err);
      // Melhora a exibição do erro para o usuário
      if (axios.isAxiosError(err) && err.response) {
        // Se houver uma resposta do servidor, tente usar a mensagem do backend
        setError(
          `Erro ao carregar logs: ${
            err.response.data.message ||
            err.response.data.detail ||
            "Ocorreu um erro no servidor."
          }`
        );
      } else {
        // Erros de rede ou outros problemas
        setError(
          "Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect para chamar fetchLogs toda vez que currentPage ou pageSize mudar
  useEffect(() => {
    fetchLogs();
  }, [currentPage, pageSize]); // Dependências: re-chama a API quando esses estados mudam

  // Função para mudar de página, passada para PaginationControls
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Função para mudar o tamanho da página, passada para PaginationControls
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0); // Volta para a primeira página ao mudar o tamanho
  };

  if (loading) {
    return <div className="container mt-4">Carregando logs...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4 mb-4">
      <h2 className="mb-4">Visualizar Logs de Usuários</h2>

      {logs.length === 0 && !loading ? (
        <p>Nenhum log encontrado. Adicione um log para visualizá-lo aqui!</p>
      ) : (
        <>
          <TableLog logs={logs} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalElements={totalElements}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
}

export default UserLogPage;
