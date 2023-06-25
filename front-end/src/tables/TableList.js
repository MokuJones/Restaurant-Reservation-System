import React from "react";
import Table from "./Table";

function TableList({ tables, loadDashboard }) {
  const list = tables.map((table) => (
    <Table key={table.table_id} table={table} loadDashboard={loadDashboard} />
  ));

  return (
    <main className="container">
      <table className="table table-bordered">
        <thead className="table table-dark">
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </main>
  );
}

export default TableList;
