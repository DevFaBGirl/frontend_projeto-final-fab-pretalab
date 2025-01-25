import axios from "axios";

const http = axios.create({
  baseURL: "https://projeto-final-fab-pretalab.vercel.app/dashboard",
  //baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
