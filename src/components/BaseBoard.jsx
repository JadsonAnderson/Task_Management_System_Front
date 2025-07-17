function BaseBoard() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="text-center p-3">
        © {new Date().getFullYear()} Gerenciador De Tarefas
      </div>
    </footer>
  );
}

export default BaseBoard;
