import PropTypes from 'prop-types';

function BaseBoard({ theme }) {
  const bgClass = theme === 'light' ? 'bg-light' : 'bg-dark';

  return (
    <footer className={`footer mt-auto py-3 ${bgClass}`}>
      <div className="container text-center">
        © {new Date().getFullYear()} Gerenciador De Tarefas
      </div>
    </footer>
  );
}

BaseBoard.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default BaseBoard;