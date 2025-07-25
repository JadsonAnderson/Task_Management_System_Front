// src/components/TableLog.jsx
import React from "react";

function TableLog({ logs }) {
  if (!logs || logs.length === 0) {
    return <p>Nenhum log para exibir.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID Log</th>
            <th>ID Usuário</th>
            <th>Ação Entrada</th>
            <th>Ação Saída</th>
            <th>Data Inclusão</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            // Usamos log.idLog para a key, pois ele deve ser único para cada log
            <tr key={log.idLog}>
              <td>{log.idLog}</td> {/* CORRIGIDO: idLog (i minúsculo) */}
              <td>{log.idUser}</td>{" "}
              {/* Presumi idUser (i minúsculo), verifique seu DTO se é IdUser */}
              <td>{log.actionIn}</td>
              <td>{log.actionOut}</td>{" "}
              {/* CORRIGIDO: actionOut (a minúsculo) */}
              <td>{new Date(log.inclusionDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLog;
