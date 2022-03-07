import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Card from ".";
import { Task } from "../../resources/types";
import store from "../../store";
import { Provider } from "react-redux";
import { updateTasks } from "../../store/actions";

const sampleData: Task[] = [
  {
    id: 1,
    content: "test",
    date: new Date(),
    isComplete: false,
    author: "someone",
  },
  {
    id: 2,
    content: "test 2",
    date: new Date(),
    isComplete: true,
    author: "someone",
  },
];

describe("DOM", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Card data={sampleData[0]} />
      </Provider>
    );
    const input: HTMLInputElement = screen.getByRole("textbox");
    const checkbox: HTMLInputElement = screen.getByRole("checkbox");
    const cardDate = container.querySelector(".card-date");

    expect(input).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(cardDate).toBeInTheDocument();
  });

  it('does not render "Delete" button with incomplete task', async () => {
    store.dispatch(updateTasks(sampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
    render(
      <Provider store={store}>
        <Card data={sampleData[0]} />
      </Provider>
    );
    const deleteButton: HTMLElement | null = screen.queryByRole("button");
    expect(deleteButton).not.toBeTruthy();
  });

  it('renders "Delete" button with complete task', async () => {
    store.dispatch(updateTasks(sampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
    render(
      <Provider store={store}>
        <Card data={sampleData[1]} />
      </Provider>
    );
    const deleteButton: HTMLElement | null = screen.queryByRole("button");
    expect(deleteButton).toBeTruthy();
  });
});

describe("Input Box", () => {
  it("updates input value on change event", () => {
    render(
      <Provider store={store}>
        <Card data={sampleData[0]} />
      </Provider>
    );
    const input: HTMLInputElement = screen.getByRole("textbox");

    act(() => {
      fireEvent.change(input, { target: { value: "changed" } });
    });
    expect(input.value).toBe("changed");
  });
});

describe("Checkbox", () => {
  it("updates checkbox value on click event", () => {
    render(
      <Provider store={store}>
        <Card data={sampleData[0]} />
      </Provider>
    );
    const checkbox: HTMLInputElement = screen.getByRole("checkbox");

    act(() => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.checked).toBe(true);

    act(() => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.checked).toBe(false);
  });
});
