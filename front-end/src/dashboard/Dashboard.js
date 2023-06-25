import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router";
import ReservationsList from "../reservations/ReservationsList";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableError, setTableError] = useState(null);

  const previousDate = previous(date);
  const nextDate = next(date);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    setTableError(null);
    listTables({}, abortController.signal).then(setTables).catch(setTableError);

    return () => abortController.abort();
  }

  //navigate to next date
  const handleNext = () => {
    history.push(`/dashboard?date=${nextDate}`);
  };

  //navigate to current date
  const handleToday = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  //navigate to previous date
  const handlePrevious = () => {
    history.push(`/dashboard?date=${previousDate}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <h4>{date}</h4>
      <button onClick={handlePrevious} className="btn btn-secondary mr-2">Previous</button>
      <button onClick={handleToday} className="btn btn-primary mr-2">Today</button>
      <button onClick={handleNext} className="btn btn-info">Next</button>
      <h4 className="text-center">Reservations</h4>
      <ErrorAlert error={reservationsError} />
      <ReservationsList reservations={reservations} load={loadDashboard} />
      <h4 className="text-center">Tables</h4>
      <ErrorAlert error={tableError} />
      <TableList tables={tables} loadDashboard={loadDashboard} />
    </main>
  );
}

export default Dashboard;
