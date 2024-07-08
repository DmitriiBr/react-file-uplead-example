import { Input } from "./Input";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Input", () => {
  it("Should type value 'testing' and Input component should have this value 'testing'", async () => {
    render(<Input data-testid="testInput" role="input" />);

    const element = screen.getByTestId("testInput");
    const value = "testing";

    await userEvent.type(element, value);
    await screen.findByRole("input");

    expect(screen.getByRole("input")).toHaveValue(value);
  });
  it("Should apply focus when focued, and drop it when blurred", async () => {
    render(<Input data-testid="testInput" role="input" />);

    const element = screen.getByTestId("testInput");

    element.focus();

    expect(element).toHaveFocus();

    element.blur();

    expect(element).not.toHaveFocus();
  });
});
