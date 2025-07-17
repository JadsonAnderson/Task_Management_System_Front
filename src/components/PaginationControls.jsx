// src/components/PaginationControls.jsx
import React from "react";

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  pageSize,
  onPageSizeChange,
}) {
  const pageNumbers = [...Array(totalPages).keys()];

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Anterior
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages - 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            Próxima
          </button>
        </li>
      </ul>

      {onPageSizeChange && (
        <div className="d-flex justify-content-center mt-3">
          <label htmlFor="pageSizeSelect" className="me-2">
            Itens por página:
          </label>
          <select
            id="pageSizeSelect"
            className="form-select w-auto"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      )}

      {totalElements > 0 && (
        <div className="text-center mt-2">
          Total de elementos: {totalElements}
        </div>
      )}
    </nav>
  );
}

export default PaginationControls;
