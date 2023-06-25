import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import SearchForm from "./SearchForm";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [mobile_number, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadSearch, [mobile_number]);

  function loadSearch() {
    const abortController = new AbortController();

    setReservationsError(null);
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  function createList() {
    if (mobile_number.length === 0) {
      return <></>;
    } else if (reservations.length === 0) {
      return <h4>No reservations found</h4>;
    } else {
      return <ReservationsList reservations={reservations} load={loadSearch} />;
    }
  }

  return (
    <main>
      <h1>Search</h1>
      <SearchForm
        setReservations={setReservations}
        setReservationsError={setReservationsError}
        setMobileNumber={setMobileNumber}
      />
      <ErrorAlert error={reservationsError} />
      {createList()}
    </main>
  );
}

export default Search;
