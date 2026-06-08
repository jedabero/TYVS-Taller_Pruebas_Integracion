import { describe, expect, it } from "vitest";

describe("TypeScript and Vitest setup", () => {
  it("shouldRunVitest", () => {
    // Arrange
    const isVitestAvailable = true;

    // Act
    const result = isVitestAvailable;

    // Assert
    expect(result).toBe(true);
  });
});
