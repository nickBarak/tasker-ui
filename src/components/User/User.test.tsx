import React from "react";
import { render, screen } from "@testing-library/react";
import { User as UserType } from "../../resources/types";
import User from ".";

const sampleData: UserType[] = [
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
    const { container } = render(
      <User data={sampleData[1]} toggleEditing={() => {}} />
    );
    const strongs = container.querySelectorAll("strong");
    const filteredStrongs = [...strongs].filter(({ textContent }) =>
      ["username: ", "role: ", "id: "].includes(textContent + "")
    );
    expect(filteredStrongs.length).toBe(3);

    const doubleFilteredStrongs = filteredStrongs.filter(
      ({ textContent, parentElement }) =>
        parentElement?.children[1].textContent?.toUpperCase() ===
        new String(
          sampleData[1][
            textContent?.slice(0, textContent.length - 2) as keyof UserType
          ]
        ).toUpperCase()
    );
    const buttons = screen.getAllByRole("button");
    const filteredButtons = buttons.filter(({ textContent }) =>
      ["Edit", "Delete"].includes(textContent + "")
    );

    expect(doubleFilteredStrongs.length).toBe(3);
    expect(filteredButtons.length).toBe(2);
  });

  it("renders buttons with 'Immune' if user is admin", () => {
    const { container } = render(
      <User data={sampleData[0]} toggleEditing={() => {}} />
    );
    const strongs = container.querySelectorAll("strong");
    const filteredStrongs = [...strongs].filter(({ textContent }) =>
      ["username: ", "role: ", "id: "].includes(textContent + "")
    );
    expect(filteredStrongs.length).toBe(3);

    const doubleFilteredStrongs = filteredStrongs.filter(
      ({ textContent, parentElement }) =>
        parentElement?.children[1].textContent?.toUpperCase() ===
        new String(
          sampleData[0][
            textContent?.slice(0, textContent.length - 2) as keyof UserType
          ]
        ).toUpperCase()
    );
    const buttons = screen.getAllByRole("button");
    const filteredButtons = buttons.filter(
      ({ textContent }) => textContent + "" === "Immune"
    );

    expect(doubleFilteredStrongs.length).toBe(3);
    expect(filteredButtons.length).toBe(2);
  });
});
