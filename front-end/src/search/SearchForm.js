import React, { useState } from "react";

function SearchForm({ setMobileNumber }) {
  const initialFormState = {
    mobile_number: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const { mobile_number } = formData;
    setMobileNumber(mobile_number);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="mobile_number"
        placeholder="Enter a customer's phone number"
        onChange={handleChange}
        value={formData.mobile_data}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary mt-2 mb-2">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
