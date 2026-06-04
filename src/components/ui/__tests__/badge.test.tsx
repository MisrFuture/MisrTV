import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders children", () => {
    const { getByText } = render(<Badge>Test</Badge>);
    expect(getByText("Test")).toBeDefined();
  });

  it("applies gold variant", () => {
    const { container } = render(<Badge variant="gold">Gold</Badge>);
    expect(container.firstChild).toHaveClass("text-cinema-yellow");
  });
});
