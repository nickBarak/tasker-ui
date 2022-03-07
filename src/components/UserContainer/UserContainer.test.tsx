import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import UserContainer from ".";
import { User } from "../../resources/types";
import { act } from "react-dom/test-utils";

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
  it("renders correctly", () => {
    const { container } = render(<UserContainer data={sampleData[0]} />);
    const users = container.querySelectorAll(".User");
    const filteredUsers = [...users].filter(
      (user) =>
        user.querySelector("span:first-of-type > span")?.textContent ===
        sampleData[0].username
    );
    const changePassword = container.querySelector(".change-password");
    expect(filteredUsers.length).toBe(1);
    expect(changePassword).toBeInTheDocument();
  });

  it("renders form if editing", async () => {
    const { container } = render(<UserContainer data={sampleData[1]} />);
    const user = container.querySelector(".User");
    const editButton = user?.querySelector(".user-button > button");
    expect(editButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(editButton!);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const changePassword = container.querySelector(".change-password");
    const newPassword = within(
      changePassword as HTMLElement
    ).queryByPlaceholderText("new password");
    expect(newPassword).toBeInTheDocument();
  });

  it("does not render form if not editing", async () => {
    const { container } = render(<UserContainer data={sampleData[1]} />);
    const user = container.querySelector(".User");
    const editButton = user?.querySelector(".user-button > button");
    expect(editButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(editButton!);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    act(() => {
      fireEvent.click(editButton!);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const changePassword = container.querySelector(".change-password");
    const newPassword = within(
      changePassword as HTMLElement
    ).queryByPlaceholderText("new password");
    expect(newPassword).not.toBeInTheDocument();
  });

  it("does not render form if user is not admin", async () => {
    const { container } = render(<UserContainer data={sampleData[0]} />);
    const user = container.querySelector(".User");
    const editButton = user?.querySelector(".user-button > button");
    expect(editButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(editButton!);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const changePassword = container.querySelector(".change-password");
    const newPassword = within(
      changePassword as HTMLElement
    ).queryByPlaceholderText("new password");
    expect(newPassword).not.toBeInTheDocument();
  });
});
