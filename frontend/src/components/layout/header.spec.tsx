import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./header";

vi.mock("../ui/sidebar", () => ({
  SidebarTrigger: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>SidebarTrigger</button>
  ),
}));

describe("Header component", () => {
  it("should render children and SidebarTrigger", () => {
    render(
      <Header>
        <div data-testid="child">Child content</div>
      </Header>
    );

    expect(screen.getByText("SidebarTrigger")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should apply fixed class when fixed prop is true", () => {
    render(<Header fixed />);

    const header = screen.getByRole("banner");
    expect(header.className).toContain("header-fixed");
    expect(header.className).toContain("fixed");
  });

  it("should add shadow-sm class when scrolled more than 10 and fixed is true", () => {
    render(<Header fixed />);

    const header = screen.getByRole("banner");

    Object.defineProperty(document.documentElement, "scrollTop", {
      writable: true,
      configurable: true,
      value: 20,
    });

    fireEvent.scroll(document);

    expect(header.className).toContain("shadow-sm");
  });

  it("should not have shadow when offset <= 10 even if fixed is true", () => {
    render(<Header fixed />);

    const header = screen.getByRole("banner");

    Object.defineProperty(document.documentElement, "scrollTop", {
      writable: true,
      configurable: true,
      value: 5,
    });

    fireEvent.scroll(document);

    expect(header.className).toContain("shadow-none");
  });

  it("should render without fixed and with no shadow by default", () => {
    render(<Header />);

    const header = screen.getByRole("banner");

    expect(header.className).not.toContain("fixed");
    expect(header.className).toContain("shadow-none");
  });
});
