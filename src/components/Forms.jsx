import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./../styles/Forms.css";

function Forms({ onFlip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Lê sempre como texto para evitar erro ao parsear JSON inválido
      const text = await response.text();

      if (!response.ok) {
        // Tenta extrair mensagem de erro do JSON, ou usa o texto puro
        let message = text;
        try {
          const parsed = JSON.parse(text);
          message = parsed.message || parsed.error || text;
        } catch {
          // texto não era JSON
        }
        alert(`Erro ao fazer login: ${message}`);
        return;
      }

      // Se chegou aqui, login bem‑sucedido
      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        // caso corpo vazio ou texto simples
      }

      console.log("Login bem‑sucedido:", data);

      // Exemplo: se houver token, armazena
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (networkError) {
      console.error("Erro de conexão:", networkError);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className="forms-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="forms-title">Login</h1>

        <label htmlFor="email" className="forms-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forms-input"
          placeholder="seu@exemplo.com"
        />

        <label htmlFor="password" className="forms-label">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="forms-input"
          placeholder="••••••••"
        />

        <button type="submit" className="forms-submit-btn">
          Entrar
        </button>

        <div className="forms-links">
          <span
            onClick={() => navigate("/RecuperarSenha")}
            className="forms-link-text"
          >
            Recover password
          </span>
          <span
            onClick={() => navigate("/cadastro")}
            className="forms-link-text"
          >
            Cadastrar
          </span>
        </div>

        <p onClick={onFlip} className="forms-flip-text">
          Perfil dos Devs
        </p>
      </form>
    </div>
  );
}

Forms.propTypes = {
  onFlip: PropTypes.func.isRequired,
};

export default Forms;
