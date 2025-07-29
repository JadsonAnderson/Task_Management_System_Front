import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/RecuperarSenha.css";

function RecuperarSenha() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Link de recuperação enviado!");
  };

  return (
    <div className="recuperar-wrapper">
      <div className="recuperar-box">
        <h1 className="recuperar-title">Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
          <div className="recuperar-field">
            <label htmlFor="email" className="recuperar-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="recuperar-input"
              placeholder="Digite seu email"
              required
            />
          </div>

          <button type="submit" className="recuperar-submit-btn">
            Enviar Link de Recuperação
          </button>

          <p onClick={() => navigate("/")} className="recuperar-back-text">
            Voltar para o login
          </p>
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;
