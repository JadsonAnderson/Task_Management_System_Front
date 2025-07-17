function PageLog() {
  return (
    <div>
      <ul className="pagination pagination">
        {" "}
        {/* class -> className */}
        <li className="page-item disabled">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            &laquo;
          </a>{" "}
          {/* class -> className */}
        </li>
        <li className="page-item active">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            1
          </a>{" "}
          {/* class -> className */}
        </li>
        <li className="page-item">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            2
          </a>{" "}
          {/* class -> className */}
        </li>
        <li className="page-item">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            3
          </a>{" "}
          {/* class -> className */}
        </li>
        <li className="page-item">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            4
          </a>{" "}
          {/* class -> className */}
        </li>
        <li className="page-item">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            5
          </a>{" "}
          {/* class -> className */}
        </li>
        <li className="page-item">
          {" "}
          {/* class -> className */}
          <a className="page-link" href="#">
            &raquo;
          </a>{" "}
          {/* class -> className */}
        </li>
      </ul>
    </div>
  );
}

export default PageLog;
