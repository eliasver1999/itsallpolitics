import axios from "axios";
//baseURL: "http://127.0.0.1:8000/api/",
export const instance = axios.create({
  baseURL: "https://api.itsallpolitics.gr/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 0,
  },
});
