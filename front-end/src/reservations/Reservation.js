import React from "react";
import { useHistory } from "react-router";
import { cancelReservation } from "../utils/api";

function Reservation({ reservation, load }) {
  const seatLink = `/reservations/${reservation.reservation_id}/seat`;
  const editLink = `/reservations/${reservation.reservation_id}/edit`;
  const history = useHistory();

  const handleSeat = () => {
    history.push(seatLink);
  };
  const handleEdit = () => {
    history.push(editLink);
  };
  const handleCancel = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      ) === true
    ) {
      cancelReservation(reservation.reservation_id).then(() => load());
    }
  };

  return (
    <tr>
      <td>{reservation.reservation_time}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.people}</td>
      <td>
        {reservation.status === "booked" && (
          <button
            href={seatLink}
            onClick={handleSeat}
            className="btn btn-outline-success mr-2"
          >
            Seat
          </button>
        )}
      </td>
      <td>
        <button
          href={editLink}
          onClick={handleEdit}
          className="btn btn-outline-warning mr-2"
        >
          Edit
        </button>
      </td>
      <td>
        {reservation.status !== "cancelled" && (
          <button
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={handleCancel}
            className="btn btn-outline-danger"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
}

export default Reservation;
