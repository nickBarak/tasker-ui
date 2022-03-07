import React from "react";
import { render, screen } from "@testing-library/react";
import LoginManager from ".";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

describe("DOM", () => {
  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginManager />
        </Provider>
      </BrowserRouter>
    );
    const title = screen.getByText("Tasker");
    const loginTitle = screen.getByText("Log in");
    const signupTitle = screen.getByText("Sign up");
    expect(title).toBeInTheDocument();
    expect(loginTitle).toBeInTheDocument();
    expect(signupTitle).toBeInTheDocument();
  });
});
