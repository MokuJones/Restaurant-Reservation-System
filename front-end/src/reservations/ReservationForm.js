import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ reservation }) {
  let initialFormState;

  if (reservation) {
    initialFormState = {
      first_name: reservation.first_name,
      last_name: reservation.last_name,
      mobile_number: reservation.mobile_number,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      people: reservation.people,
    };
  } else {
    initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 0,
    };
  }

  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  const handleChange = ({ target }) => {
    const value =
      target.name === "people" ? target.valueAsNumber : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    console.log("Submitted:", formData);
    const newReservation = {
      ...formData,
    };

    setReservationsError(null);

    const currentDate = new Date().toISOString().split("T")[0];

    if (newReservation.reservation_date < currentDate) {
      setReservationsError(
        new Error("Reservation date cannot be a past date.")
      );
      return;
    }

    const mobileNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
  if (!mobileNumberPattern.test(newReservation.mobile_number)) {
    setReservationsError(new Error("Invalid mobile number format. Please use the format xxx-xxx-xxxx. (numbers only)"));
    return;
  }

    let response;
    if (reservation) {
      response = await editReservation(
        reservation.reservation_id,
        newReservation,
        abortController.signal
      );
    } else {
      response = await createReservation(
        newReservation,
        abortController.signal
      );
    }

    const savedData = await response.json();
    setReservationsError(Error(savedData.error));
    console.log("Saved reservation!", savedData);
    if (!savedData.error) {
      history.push(`/dashboard?date=${newReservation.reservation_date}`);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">
          First Name
          <input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            className="form-control"
          />
        </label>
        <br />
        <label htmlFor="last_name">
          Last Name
          <input
            id="last_name"
            type="text"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            className="form-control"
          />
        </label>
        <br />
        <label htmlFor="mobile_number">
          Mobile Number
          <input
            id="mobile_number"
            type="tel"
            placeholder="xxx-xxx-xxxx"
            name="mobile_number"
            onChange={handleChange}
            value={formData.mobile_number}
            className="form-control"
          />
        </label>
        <br />
        <label htmlFor="reservation_date">
          Date
          <input
            id="reservation_date"
            type="date"
            name="reservation_date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
            value={formData.reservation_date}
            className="form-control"
          />
        </label>
        <br />
        <label htmlFor="reservation_time">
          Time
          <input
            id="reservation_time"
            type="time"
            name="reservation_time"
            pattern="[0-9]{2}:[0-9]{2}"
            onChange={handleChange}
            value={formData.reservation_time}
            className="form-control"
          />
        </label>
        <br />
        <label htmlFor="people">
          Party Size
          <input
            id="people"
            type="number"
            name="people"
            onChange={handleChange}
            value={formData.people}
            className="form-control"
          />
        </label>
        <br />
        <ErrorAlert error={reservationsError} />
        <br />
        <button className="btn btn-primary mr-2" type="submit">
          Submit
        </button>
        <button className="btn btn-danger" type="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
