import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.itsallpolitics.gr/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 0,
  },
});
