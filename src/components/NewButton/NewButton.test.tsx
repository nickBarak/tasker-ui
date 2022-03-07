import React from "react";
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import NewButton from ".";
import { Provider } from "react-redux";
import store from "../../store";

describe("DOM", () => {
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <NewButton />
      </Provider>
    );
    const buttons: HTMLButtonElement[] = screen.getAllByRole("button");
    const input: HTMLInputElement = screen.getByRole("textbox");
    const filteredButtons = buttons.filter(({ textContent }) =>
      ["Submit", "New"].includes(textContent + "")
    );

    expect(filteredButtons.length).toEqual(2);
    expect(input).toBeInTheDocument();
  });
});

describe("Button Text", () => {
  it('changes "New" button text on click events', () => {
    render(
      <Provider store={store}>
        <NewButton />
      </Provider>
    );
    const buttons: HTMLButtonElement[] = screen.getAllByRole("button");
    const newButton: HTMLButtonElement = buttons.find(
      ({ textContent }) => textContent == "New"
    )!;
    expect(newButton).toBeTruthy();

    act(() => {
      fireEvent.click(newButton);
    });
    expect(newButton.textContent).toBe("Cancel");

    act(() => {
      fireEvent.click(newButton);
    });
    expect(newButton.textContent).toBe("New");
  });

  it('changes "Submit" button text on submit events', async () => {
    const { container } = render(
      <Provider store={store}>
        <NewButton />
      </Provider>
    );
    const form: HTMLFormElement = container.querySelector("form")!;
    expect(form).toBeTruthy();
    const input: HTMLInputElement = within(form).getByRole("textbox");
    const submitButton: HTMLButtonElement = within(form).getByRole("button");

    act(() => {
      fireEvent.submit(form);
    });
    expect(submitButton.textContent).toBe("Empty!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    expect(submitButton.textContent).toBe("Submit");

    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    act(() => {
      fireEvent.submit(form);
    });
    expect(submitButton.textContent).toBe("Submitting...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(submitButton.textContent).toBe("Retry!");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(submitButton.textContent).toBe("Submit");
  });
});

describe("Input Box", () => {
  it("updates input value on change event", () => {
    render(
      <Provider store={store}>
        <NewButton />
      </Provider>
    );
    const input: HTMLInputElement = screen.getByRole("textbox");

    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    expect(input.value).toBe("test");
  });
});

describe("Form Submission", () => {
  it("does not trigger request with empty content", () => {
    const { container } = render(
      <Provider store={store}>
        <NewButton />
      </Provider>
    );
    const form: HTMLFormElement = container.querySelector("form")!;
    expect(form).toBeTruthy();
    const submitButton: HTMLButtonElement = within(form).getByRole("button");

    act(() => {
      fireEvent.submit(form);
    });
    expect(submitButton.textContent).not.toBe("Submitting...");
  });

  it("triggers request with non-empty content", async () => {
    const { container } = render(
      <Provider store={store}>
        <NewButton />
      </Provider>
    );
    const form: HTMLFormElement = container.querySelector("form")!;
    expect(form).toBeTruthy();
    const input: HTMLInputElement = within(form).getByRole("textbox");
    const submitButton: HTMLButtonElement = within(form).getByRole("button");

    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    act(() => {
      fireEvent.submit(form);
    });
    expect(submitButton.textContent).toBe("Submitting...");
  });
});
