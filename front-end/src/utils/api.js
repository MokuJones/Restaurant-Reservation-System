/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

/*Reservations*/

//list reservations
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

//retrieve a reservation
export async function getReservation(reservationId, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  const options = {
    method: "GET",
    headers,
    signal,
  };
  return await fetchJson(url, options, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

//create new reservation
export async function createReservation(data, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetch(url, options);
}

//update existing reservation
export async function editReservation(reservationId, data, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetch(url, options);
}

//cancel a reservation
export async function cancelReservation(reservationId, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}/status`);
  const options = {
    method: "PUT",
    headers,
    signal,
    body: JSON.stringify({ data: { status: "cancelled" } }),
  };
  return await fetch(url, options);
}

/*Tables*/

//list tables
export async function listTables(params, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}

//create new table
export async function createTable(data, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetch(url, options);
}

//seat a reservation at a table
export async function seatReservation(tableId, data, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/seat`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetch(url, options);
}

//finish a table
export async function finishTable(tableId, signal) {
  const tableUrl = new URL(`${API_BASE_URL}/tables/${tableId}/seat`);
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetch(tableUrl, options);
}
