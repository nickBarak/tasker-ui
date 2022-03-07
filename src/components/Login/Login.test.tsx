import React from "react";
import { render, screen, within, act, fireEvent } from "@testing-library/react";
import Login from ".";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import { SIGN_UP, LOG_IN } from "../../store/types";

describe("DOM", () => {
  it("renders correctly", () => {
    const login = render(
      <BrowserRouter>
        <Provider store={store}>
          <Login type={LOG_IN} />
        </Provider>
      </BrowserRouter>
    );
    const signup = render(
      <BrowserRouter>
        <Provider store={store}>
          <Login type={SIGN_UP} />
        </Provider>
      </BrowserRouter>
    );
    const loginTitle = within(login.container).getByText("Log in");
    const signupTitle = within(signup.container).getByText("Sign up");
    const loginForm = login.container.querySelector("form");
    const signupForm = signup.container.querySelector("form");
    const loginInputs = login.container.querySelectorAll("input");
    const signupInputs = signup.container.querySelectorAll("input");

    expect(loginTitle).toBeInTheDocument();
    expect(loginForm).toBeInTheDocument();
    expect(loginInputs.length).toBe(2);

    expect(signupTitle).toBeInTheDocument();
    expect(signupForm).toBeInTheDocument();
    expect(signupInputs.length).toBe(3);
  });
});

describe("Form Updates", () => {
  it("updates input values on change events", () => {
    const login = render(
      <BrowserRouter>
        <Provider store={store}>
          <Login type={LOG_IN} />
        </Provider>
      </BrowserRouter>
    );
    const signup = render(
      <BrowserRouter>
        <Provider store={store}>
          <Login type={SIGN_UP} />
        </Provider>
      </BrowserRouter>
    );
    const loginInputs = login.container.querySelectorAll("input");
    const signupInputs = signup.container.querySelectorAll("input");

    act(() => {
      fireEvent.change(loginInputs[0], { target: { value: "new login text" } });
    });
    act(() => {
      fireEvent.change(signupInputs[1], {
        target: { value: "new signup text" },
      });
    });

    expect(loginInputs[0].value).toBe("new login text");
    expect(signupInputs[1].value).toBe("new signup text");
  });
});
