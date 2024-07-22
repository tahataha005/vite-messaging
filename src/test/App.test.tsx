import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HelloWorld from "../HelloWorld";

describe("App Component", () => {
  it('renders the "Hello World" message', () => {
    const { getByTestId } = render(<HelloWorld />);
    const helloWorldMessage = screen.getByText("Hello World");
    expect(helloWorldMessage).toHaveTextContent("Hello World");
  });
});
