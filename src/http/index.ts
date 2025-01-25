import axios from "axios";

const http = axios.create({
  baseURL: "https://backend-projeto-final-fab-pretalab.onrender.com",
  //baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
