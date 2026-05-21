import { describe, it, expect } from "vitest"

describe("./:DepiFlash", () => {
  it("has proper test setup", () => {
    expect(1 + 1).toBe(2)
  })

  it("test framework works with jsdom", () => {
    expect(typeof window).toBe("object")
    expect(typeof document).toBe("object")
  })
})
