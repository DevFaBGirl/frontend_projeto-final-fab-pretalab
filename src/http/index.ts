import axios from "axios";

const http = axios.create({
  baseURL: "https://backend-projeto-final-fab-pretalab.onrender.comm",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
