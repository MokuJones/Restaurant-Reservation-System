import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const { reservationId } = useParams();
  const [reservationError, setReservationError] = useState(null);
  const [reservation, setReservation] = useState({});

  useEffect(loadForm, [reservationId]);

  function loadForm() {
    const abortController = new AbortController();
    
    setReservationError(null);
    getReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Edit Reservation #{reservationId}</h1>
      {reservation.first_name ? (
        <ReservationForm reservation={reservation} />
      ) : (
        <p>loading</p>
      )}
      <ErrorAlert error={reservationError} />
    </main>
  );
}

export default EditReservation;
