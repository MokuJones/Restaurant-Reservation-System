import React from "react";
import { finishTable } from "../utils/api";

function Table({ table, loadDashboard }) {
  const handleClick = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      ) === true
    ) {
      finishTable(table.table_id).then(() => loadDashboard());
    }
  };

  return (
    <tr>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? (
          <p className="text-danger">Occupied</p>
        ) : (
          <p className="text-success">Free</p>
        )}
      </td>
      {table.reservation_id ? (
        <td>
          <button
            data-table-id-finish={table.table_id}
            onClick={handleClick}
            className="btn btn-outline-dark"
          >
            Finish
          </button>
        </td>
      ) : (
        <td>--</td>
      )}
    </tr>
  );
}

export default Table;
