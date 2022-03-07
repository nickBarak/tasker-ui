import React, { useState } from "react";
import "./Login.css";
import { routes } from "../../resources";
import { useNavigate } from "react-router-dom";
import { LOG_IN, SIGN_UP } from "../../store/types";
import { useDispatch } from "react-redux";
import { updateTasks, updateUser } from "../../store/actions";
import { getTasks, login, signup } from "../../resources/ajax";

const Login = ({ type }: { type: typeof LOG_IN | typeof SIGN_UP }) => {
  const isLogin = type === LOG_IN;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin && formData.password !== confirmPassword)
      return setError("Passwords must match");

    try {
      const user = await (isLogin ? login(formData) : signup(formData));
      dispatch(updateUser(user));
      getTasks().then((tasks) => dispatch(updateTasks(tasks)));
      navigate(routes.HOME);
    } catch (status) {
      switch (status) {
        case 401:
          return setError("Ivalid credentials");
        case 404:
          return setError("No user with that username");
        case 409:
          return setError("Username not available");
        default:
          setError("Something went wrong");
      }
    }
  };

  return (
    <div className="Login">
      <div className="heading">{isLogin ? "Log in" : "Sign up"}</div>
      <div className="error">{error}</div>
      <div className="prompt">Please submit your credentials below</div>
      <form onSubmit={onSubmit} autoComplete="off">
        <input
          type="text"
          required
          name="username"
          placeholder="username"
          onChange={onChange}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="password"
          onChange={onChange}
        />
        {!isLogin && (
          <input
            type="password"
            required
            name="confirmPassword"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
        )}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
