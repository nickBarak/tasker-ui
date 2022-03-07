import React from "react";
import { render, screen } from "@testing-library/react";
import Admin from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import { updateUser } from "../../store/actions";
import { User } from "../../resources/types";

const sampleData: User = {
  id: 1,
  username: "user1",
  role: "ADMIN",
};

describe("DOM", () => {
  it("renders correctly", async () => {
    store.dispatch(updateUser(sampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Admin />
        </Provider>
      </BrowserRouter>
    );
    const heading = container.querySelector(".heading");
    const buttons = screen.getAllByRole("button");
    const filteredButtons = buttons.filter(({ textContent }) =>
      ["Log Out", "See Tasks"].includes(textContent + "")
    );
    const userList = container.querySelector("ul");
    const firstUser = userList?.children[0] as HTMLElement;
    const secondUser = userList?.children[1] as HTMLElement;
    const firstUsername = firstUser?.querySelector(
      "span:first-of-type > span"
    )?.textContent;
    const secondUsername = secondUser?.querySelector(
      "span:first-of-type > span"
    )?.textContent;
    const sortedUsernames = [firstUsername, secondUsername].sort();

    expect(heading).toBeInTheDocument();
    expect(filteredButtons.length).toBe(2);
    expect(userList).toBeInTheDocument();
    expect(firstUser).toBeInTheDocument();
    expect(sortedUsernames[0]).toBe(firstUsername);
  });
});
