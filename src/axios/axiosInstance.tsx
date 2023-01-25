import axios from "axios";

export const instance = axios.create({
  baseURL: "https://www.itsallpolitics.gr/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 0,
  },
});
