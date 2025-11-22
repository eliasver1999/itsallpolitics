import axios from "axios";
//baseURL: "https://api.itsallpolitics.gr/api/",
export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: "https://api.itsallpolitics.gr/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 0,
  },
});
