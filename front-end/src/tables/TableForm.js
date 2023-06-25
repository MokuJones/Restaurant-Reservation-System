import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableForm() {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const history = useHistory();
  const [tableError, setTableError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    const table = {
      ...formData,
    };

    setTableError(null);

    const response = await createTable(table);
    const savedData = await response.json();
    setTableError(Error(savedData.error));
    console.log("Saved table!", savedData);
    if (!savedData.error) {
      history.push(`/dashboard`);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handleChange = ({ target }) => {
    const value =
      target.name === "capacity" ? target.valueAsNumber : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="table_name">
        Table Name
        <input
          id="table_name"
          type="text"
          name="table_name"
          minLength="2"
          onChange={handleChange}
          value={formData.table_name}
          className="form-control"
          required
        />
      </label>
      <br />
      <label htmlFor="capacity">
        Capacity
        <input
          id="capacity"
          type="number"
          name="capacity"
          onChange={handleChange}
          value={formData.capacity}
          className="form-control"
          required
        />
      </label>
      <br />
      <ErrorAlert error={tableError} />
      <br />
      <button type="submit" className="btn btn-primary mr-2">
        Submit
      </button>
      <button type="cancel" className="btn btn-danger" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default TableForm;
