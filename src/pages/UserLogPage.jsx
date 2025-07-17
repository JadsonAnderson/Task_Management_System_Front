import PageLog from "../components/PageLog";
import TableLog from "../components/TableLog";
import GetMockUserLog from "../mocks/GetMockUserLog";

function UserLogPage() {
  const logDataProps = GetMockUserLog();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "86vh" }}
      className="container mt-4 mb-4"
    >
      <div
        style={{
          //padding: "20px",
          // //maxWidth: "800px",
          // //margin: "20px auto",
          flexGrow: 1,
        }}
      >
        <TableLog {...logDataProps} />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <PageLog /> {/* Renderiza o componente de paginação da tabela */}
      </div>
    </div>
  );
}

export default UserLogPage;
