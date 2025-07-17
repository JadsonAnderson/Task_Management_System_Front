// src/pages/PageAddUserLog.jsx
import { useState } from "react";
import axios from "axios"; // <-- NOVO: Importe o Axios

function PageAddUserLog() {
  const [acaoForm, setAcaoForm] = useState("");
  const [statusForm, setStatusForm] = useState("");
  const [dataForm, setDataForm] = useState("");

  const API_URL = "http://localhost:8080/UserLogController"; // <-- Verifique o 'U' maiúsculo

  const handleSubmit = async (e) => {
    e.preventDefault();

    let inclusionDate;
    if (dataForm) {
      const localDate = new Date(dataForm + "T12:00:00");
      inclusionDate = localDate.toISOString();
    } else {
      inclusionDate = new Date().toISOString();
    }

    const novoLogParaAPI = {
      actionIn: acaoForm,
      actionOut: statusForm,
      inclusionDate: inclusionDate,
    };

    console.log("Dados a serem enviados para a API:", novoLogParaAPI);

    try {
      // 1. Usar axios.post em vez de fetch
      const response = await axios.post(API_URL, novoLogParaAPI, {
        headers: {
          "Content-Type": "application/json", // Axios geralmente define isso automaticamente, mas é bom ser explícito
        },
        // Credenciais (se precisar enviar cookies ou autenticação)
        // withCredentials: true,
      });

      // 2. Axios lida com status de erro (4xx, 5xx) lançando uma exceção no catch
      //    Então, se chegamos aqui, a requisição foi bem-sucedida (status 2xx)
      const responseData = response.data; // Os dados da resposta estão em response.data

      console.log("Log Adicionado com Sucesso:", responseData);
      alert("Log de Usuário Adicionado com Sucesso!");

      // Limpar o formulário
      setAcaoForm("");
      setStatusForm("");
      setDataForm("");
    } catch (error) {
      // 3. Tratamento de erros do Axios
      if (axios.isAxiosError(error)) {
        // Verifica se é um erro do Axios
        if (error.response) {
          // Erro de resposta do servidor (ex: 400, 404, 500)
          console.error(
            "Erro ao adicionar log (Axios):",
            error.response.status,
            error.response.data
          );
          alert(
            `Erro ao adicionar log: ${
              error.response.data.message ||
              error.response.data.detail ||
              "Ocorreu um erro desconhecido."
            }`
          );
        } else if (error.request) {
          // A requisição foi feita, mas nenhuma resposta foi recebida
          console.error(
            "Erro de requisição (Axios): Nenhuma resposta recebida",
            error.request
          );
          alert(
            "Não foi possível conectar ao servidor. O backend não respondeu."
          );
        } else {
          // Algo aconteceu na configuração da requisição que disparou um erro
          console.error("Erro de configuração (Axios):", error.message);
          alert("Erro na configuração da requisição.");
        }
      } else {
        // Outros erros que não são do Axios (ex: erro de JavaScript no código)
        console.error("Erro inesperado:", error);
        alert("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="mb-4">Adicionar Novo Log de Usuário</h2>
      <form onSubmit={handleSubmit}>
        {/* REMOVIDO: O campo "ID Usuário" foi removido do JSX */}
        {/* <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">
            ID Usuário
          </label>
          <input
            type="text"
            className="form-control"
            id="idUsuario"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="acaoForm" className="form-label">
            Ação
          </label>
          <input
            type="text"
            className="form-control"
            id="acaoForm"
            value={acaoForm}
            onChange={(e) => setAcaoForm(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="statusForm" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="statusForm"
            value={statusForm}
            onChange={(e) => setStatusForm(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataForm" className="form-label">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="dataForm"
            value={dataForm}
            onChange={(e) => setDataForm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Log
        </button>
      </form>
    </div>
  );
}

export default PageAddUserLog;
