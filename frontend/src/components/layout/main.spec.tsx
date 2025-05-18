import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Main } from "./main";

describe("Main component", () => {
  it("should render the main element", () => {
    render(<Main data-testid="main-element" />);

    const main = screen.getByTestId("main-element");
    expect(main.tagName).toBe("MAIN");
  });

  it("should apply fixed-main class when fixed prop is true", () => {
    render(<Main fixed data-testid="main-fixed" />);

    const main = screen.getByTestId("main-fixed");
    expect(main.className).toContain("fixed-main");
    expect(main.className).toContain("flex");
    expect(main.className).toContain("grow");
    expect(main.className).toContain("flex-col");
    expect(main.className).toContain("overflow-hidden");
  });

  it("should not apply fixed-main classes when fixed prop is false or undefined", () => {
    render(<Main data-testid="main-no-fixed" />);

    const main = screen.getByTestId("main-no-fixed");
    expect(main.className).not.toContain("fixed-main");
    expect(main.className).not.toContain("flex");
    expect(main.className).not.toContain("grow");
    expect(main.className).not.toContain("flex-col");
    expect(main.className).not.toContain("overflow-hidden");
  });

  it("should always include the base padding and peer class", () => {
    render(<Main data-testid="main-base" />);

    const main = screen.getByTestId("main-base");
    expect(main.className).toContain("px-4");
    expect(main.className).toContain("py-6");
    expect(main.className).toContain("peer-[.header-fixed]/header:mt-16");
  });

  it("should forward additional HTML attributes", () => {
    render(
      <Main id="main-id" aria-label="Main content" data-testid="main-props" />
    );

    const main = screen.getByTestId("main-props");
    expect(main).toHaveAttribute("id", "main-id");
    expect(main).toHaveAttribute("aria-label", "Main content");
  });
});
