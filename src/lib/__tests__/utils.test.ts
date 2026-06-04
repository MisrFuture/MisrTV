import { describe, it, expect } from "vitest";
import { cn, formatCurrency } from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden")).toBe("base");
  });
});

describe("formatCurrency", () => {
  it("formats millions", () => {
    const result = formatCurrency(5000000);
    expect(result).toContain("$5");
  });

  it("formats billions", () => {
    const result = formatCurrency(1500000000);
    expect(result).toContain("$1");
  });
});
