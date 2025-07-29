import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/FormsCadastro.css";

function FormsCadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com(\.br)?|br|net|org)$/;

    if (!emailRegex.test(email)) {
      alert("E-mail inválido. Use um e-mail como usuario@dominio.com");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const text = await response.text();

      if (!response.ok) {
        let message = text;
        try {
          message = JSON.parse(text).message || text;
        } catch {}
        alert(`Erro ao cadastrar: ${message}`);
        return;
      }

      let data = {};
      try {
        data = JSON.parse(text);
      } catch {}

      console.log("Resposta do back-end:", data);
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (networkError) {
      console.error("Erro de conexão:", networkError);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="cadastro-title">Cadastro</h1>

        <label htmlFor="name" className="cadastro-label">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="cadastro-input"
        />

        <label htmlFor="email" className="cadastro-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="cadastro-input"
          placeholder="usuario@dominio.com"
        />

        <label htmlFor="password" className="cadastro-label">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="cadastro-input"
        />

        <label htmlFor="confirmPassword" className="cadastro-label">
          Confirmar Senha:
        </label>
        <input
          type="password"
          id="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
          className="cadastro-input"
        />

        <button type="submit" className="cadastro-submit-btn">
          Cadastrar
        </button>

        <div className="cadastro-back-link" onClick={() => navigate("/")}>
          Voltar para o login
        </div>
      </form>
    </div>
  );
}

export default FormsCadastro;
