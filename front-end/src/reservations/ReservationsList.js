import React from "react";
import Reservation from "./Reservation";

function ReservationsList({ reservations, load }) {
  //table of reservations
  const list = reservations.map((reservation) => (
    <Reservation
      key={reservation.reservation_id}
      reservation={reservation}
      load={load}
    />
  ));

  return (
    <main className="container">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Time</th>
            <th>Status</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>People</th>
            <th>Seat</th>
            <th>Edit</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </main>
  );
}

export default ReservationsList;
