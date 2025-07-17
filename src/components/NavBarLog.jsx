// src/components/NavBarLog.jsx

function NavBarLog({ onVisualizarUsuariosClick, onAdicionarUsuariosClick }) {
  return (
    // Removi o <div> extra que estava envolvendo a <nav>.
    // A <nav> é o elemento raiz do componente.
    // Ter um <div> extra sem propósito pode afetar o layout.
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        {/* Adicionei o brand "Gerenciador de Tarefas" aqui, caso queira */}
        <a className="navbar-brand" href="#">
          Painel
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Início
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tarefas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Agendas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sobre
              </a>
            </li>

            {/* INÍCIO DO DROPDOWN DE MONITORAMENTO */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Monitoramento
              </a>
              <div className="dropdown-menu">
                {/* O item "Usuários" agora será um NOVO DROPDOWN */}
                <li className="dropdown-item dropend">
                  {" "}
                  {/* Use dropend para abrir para a direita */}
                  <a
                    className="dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Usuários
                  </a>
                  <ul className="dropdown-menu">
                    {" "}
                    {/* O SUBMENU AQUI */}
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onAdicionarUsuariosClick) {
                            // Chame a nova prop
                            onAdicionarUsuariosClick();
                          }
                        }}
                      >
                        Adicionar Usuário
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#" // Use href="#" e e.preventDefault()
                        onClick={(e) => {
                          e.preventDefault(); // IMPEDE A NAVEGAÇÃO PADRÃO DO LINK
                          if (onVisualizarUsuariosClick) {
                            // Verifica se a prop existe
                            onVisualizarUsuariosClick(); // CHAMA A FUNÇÃO PASSADA DO App.jsx
                          }
                        }}
                      >
                        Visualizar Usuários
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/monitoramento/usuarios/atualizar"
                      >
                        Atualizar Usuário
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/monitoramento/usuarios/deletar"
                      >
                        Deletar Usuário
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Fim do novo dropdown "Usuários" */}

                <a className="dropdown-item" href="/monitoramento/agendas">
                  Agendas
                </a>
                <a className="dropdown-item" href="/monitoramento/erros">
                  Erros
                </a>
              </div>
            </li>
          </ul>

          <form className="d-flex">
            {/* A barra de pesquisa e o botão estão dentro de um form,
                e você tem uma <ul> dentro do <form>.
                Normalmente, a <ul> de navegação principal vai fora do form,
                e o form teria apenas o input e o botão.
                Se a intenção é ter 'Suporte' como um item de menu à direita,
                ele pode ficar em uma <ul> separada com a classe 'navbar-nav'
                e 'ms-auto' para empurrá-lo para a direita.
                Deixei como está no seu código, mas é algo a observar para semântica e layout.
            */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Suporte
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLog;
