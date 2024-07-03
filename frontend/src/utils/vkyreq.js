import axios from "axios";
import {getCookie } from "./Cookies";


// importing env variable 
const backend  = import.meta.env.VITE_BACKEND_URL;

export const vkyreq = (type, endpoint, body={}) => {
  const headers = {};

  // Check if jwt cookie exists
  const jwtCookie = getCookie("jwt");
  if (jwtCookie) {
    headers["Authorization"] = `Bearer ${jwtCookie}`;
  }

  let responsePromise;

  if (type.toLowerCase() === "get") {
    responsePromise = axios.get(backend + endpoint, {
      headers: headers,
    });
  } else if (type.toLowerCase() === "post") {
    responsePromise = axios.post(
      backend + endpoint,
      body,
      { headers: headers }
    );
  } else if (type.toLowerCase() === "patch") {
    responsePromise = axios.patch(
      backend + endpoint,
      body,
      { headers: headers }
    );
  } else if (type.toLowerCase() === "delete") {
    responsePromise = axios.delete(
      backend + endpoint,
      { headers: headers }
    );
  } else {
    throw new Error(`Unsupported request type: ${type}`);
  }

  return responsePromise;
};