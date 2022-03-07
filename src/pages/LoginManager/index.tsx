import React from "react";
import "./LoginManager.css";
import { LOG_IN, SIGN_UP } from "../../store/types";
import Login from "../../components/Login";

function LoginManager() {
  return (
    <div className="LoginManager">
      <div className="title">Tasker</div>
      <Login type={LOG_IN} />
      <Login type={SIGN_UP} />
    </div>
  );
}

export default LoginManager;
