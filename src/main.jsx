import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap base
import "bootswatch/dist/morph/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Certifique-se de que o caminho está correto
import "./index.css";
// Adicione esta linha:
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TelaLogin from "./TelaLogin.jsx";
import RecuperarSenha from "./RecuperarSenha.jsx";
import CadastroUsers from "./CadastroUsers.jsx";
import Agenda from "./Agenda.jsx"; // Certifique-se de importar Agenda corretamente
// Adicione esta linha

const router = createBrowserRouter([
  {
    path: "/",
    element: <TelaLogin />,
  },
  {
    path: "/cadastro",
    element: <CadastroUsers />, // Substitua por FormsCadastro se necessário
  },
  {
    path: "/RecuperarSenha",
    element: <RecuperarSenha />, // Substitua por FormsRecuperarSenha se necessário
  },
  {
    path: "/home",
    element: <App />, // Certifique-se de importar AgendaScreen corretamente
  },
  {
    path: "/agenda",
    element: <Agenda />, // Certifique-se de importar Agenda corretamente
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
