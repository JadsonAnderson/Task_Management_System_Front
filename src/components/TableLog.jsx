function TableLog(props) {
  // Variabel
  const { labelId } = props;
  const { labelIdEntityExternal } = props;
  const { labelActionIn } = props;
  const { labelActionOut } = props;
  const { labelInclusionDate } = props;

  // Values
  const { IdLog } = props;
  const { IDEntityExternal } = props;
  const { actionIn } = props;
  const { actionOut } = props;
  const { inclusionDate } = props;

  return (
    <table className="table table-hover">
      {" "}
      {/* class -> className */}
      <thead>
        <div style={{ height: "60px" }}></div>
        <tr>
          <th scope="col">{labelId} </th>
          <th scope="col">{labelIdEntityExternal}</th>
          <th scope="col">{labelActionIn}</th>
          <th scope="col">{labelActionOut}</th>
          <th scope="col">{labelInclusionDate}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-light">
          {" "}
          {/* class -> className */}
          <td>{IdLog}</td>
          <td>{IDEntityExternal}</td>
          <td>{actionIn}</td>
          <td>{actionOut}</td>
          <td>{inclusionDate}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableLog;
