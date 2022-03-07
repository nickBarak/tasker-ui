import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout } from "./ajax";

const { REACT_APP_API_HOST, REACT_APP_API_PORT } = process.env;

export const api = new URL(
  `http://${REACT_APP_API_HOST || "localhost"}:${REACT_APP_API_PORT || "8081"}`
);

export const ajaxCaller = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt || (jwtDecode(jwt) as any).exp * 1000 < new Date().getTime()) {
    logout();
    window.location.reload();
  }

  return axios.create({
    baseURL: api.toString(),
    headers: { Authorization: "Bearer " + jwt },
  });
};

export const routes = {
  HOME: "/",
  LOG_IN: "/login",
  ADMIN: "/admin",
};

export const apiRoutes = {
  LOG_IN: "login",
  REGISTER: "login/register",
  USER: "user",
  TASK: "task",
};
