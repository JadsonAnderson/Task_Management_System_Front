import PropTypes from 'prop-types';

function NavBarLog({
  onVisualizarUsuariosClick,
  onAdicionarUsuariosClick,
  onAddTaskClick,
  onViewTasksClick,
  onHomeClick,
  theme,
  onToggleTheme,
}) {
  return (
    <nav className={`navbar navbar-expand-lg bg-${theme === 'light' ? 'light' : 'dark'}`}
      data-bs-theme={theme === 'light' ? 'light' : 'dark'}>
      <div className="container-fluid">
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
              <a className="nav-link active" href="#" onClick={(e) => {
                // Evita o comportamento padrão do link
                e.preventDefault();
                if (onHomeClick) {
                  onHomeClick();  // A função para "home" é chamada
                }
              }}
              >
                Início
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tarefas
              </a>
              <div className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onAddTaskClick();
                    }}
                  >
                    Adicionar
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onViewTasksClick();
                    }}
                  >
                    Visualizar
                  </a>
                </li>
              </div>
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
                <li className="dropdown-item dropend">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Usuários
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onAdicionarUsuariosClick) {
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
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onVisualizarUsuariosClick) {
                            onVisualizarUsuariosClick();
                          }
                        }}
                      >
                        Visualizar Usuários
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/monitoramento/usuarios/atualizar">
                        Atualizar Usuário
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/monitoramento/usuarios/deletar">
                        Deletar Usuário
                      </a>
                    </li>
                  </ul>
                </li>
                <a className="dropdown-item" href="/monitoramento/agendas">
                  Agendas
                </a>
                <a className="dropdown-item" href="/monitoramento/erros">
                  Erros
                </a>
              </div>
            </li>
          </ul>

          <form className="d-flex align-items-center gap-2">
            {/* <ul className="navbar-nav me-auto"> */}
              {/* <li className="nav-item"> */}
                <a className="nav-link" href="#">
                  Suporte
                </a>
              {/* </li> */}
            {/* </ul> */}
            <button
              className={`btn btn-outline-${theme === 'light' ? 'dark' : 'light'}`}
              type="button"
              onClick={onToggleTheme}
            >
              Modo {theme === 'light' ? 'Escuro' : 'Claro'}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

NavBarLog.propTypes = {
  onVisualizarUsuariosClick: PropTypes.func,  // Não é obrigatório
  onAdicionarUsuariosClick: PropTypes.func,  // Não é obrigatório
  onAddTaskClick: PropTypes.func.isRequired,
  onViewTasksClick: PropTypes.func.isRequired,
  onHomeClick: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default NavBarLog;