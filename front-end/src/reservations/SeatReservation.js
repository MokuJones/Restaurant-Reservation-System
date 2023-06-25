import React from "react";
import { useParams } from "react-router";
import SeatReservationForm from "./SeatReservationForm";

function SeatReservation() {
  const { reservationId } = useParams();

  return (
    <main>
      <h1>Seat Reservation {reservationId}</h1>
      <SeatReservationForm reservation_id={reservationId} />
    </main>
  );
}

export default SeatReservation;
