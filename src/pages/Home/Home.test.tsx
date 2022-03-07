import React from "react";
import { render, screen } from "@testing-library/react";
import Home from ".";
import { User } from "../../resources/types";
import { Provider } from "react-redux";
import store from "../../store";
import { updateUser } from "../../store/actions";
import { BrowserRouter } from "react-router-dom";

const sampleData: User[] = [
  {
    id: 1,
    username: "user1",
    role: "ADMIN",
  },
  {
    id: 2,
    username: "user2",
    role: "USER",
  },
];

describe("DOM", () => {
  it("renders correctly", async () => {
    store.dispatch(updateUser(sampleData[0]));
    await new Promise((resolve) => setTimeout(resolve, 500));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    const title = screen.getByText("Tasker");
    const user = screen.getByText(sampleData[0].username);
    expect(title).toBeInTheDocument();
    expect(user).toBeInTheDocument();
  });

  it("renders 'Manage Users' button if user is admin", async () => {
    store.dispatch(updateUser(sampleData[0]));
    await new Promise((resolve) => setTimeout(resolve, 500));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole("button");
    const filteredButtons = buttons.filter(
      (btn) => btn.textContent === "Manage Users"
    );
    expect(filteredButtons.length).toBe(1);
  });

  it("does not render 'Manage Users' button if user is not admin", async () => {
    store.dispatch(updateUser(sampleData[1]));
    await new Promise((resolve) => setTimeout(resolve, 500));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole("button");
    const filteredButtons = buttons.filter(
      ({ textContent }) => textContent === "Manage Users"
    );
    expect(filteredButtons.length).toBe(0);
  });
});
