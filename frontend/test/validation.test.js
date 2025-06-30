const { validatePasswordMatch } = require("../utilsTest/validation");

describe("validatePasswordMatch", () => {
    it("returns true for identical strings", () => {
        expect(validatePasswordMatch("abc123", "abc123")).toBe(true);
    });

    it("returns false when passwords differ", () => {
        expect(validatePasswordMatch("abc123", "ABC123")).toBe(false);
        expect(validatePasswordMatch("foo", "bar")).toBe(false);
    });

    it("handles empty strings", () => {
        expect(validatePasswordMatch("", "")).toBe(true);
        expect(validatePasswordMatch("", "non-empty")).toBe(false);
    });

    it("handles null/undefined safely", () => {
        expect(validatePasswordMatch(null, null)).toBe(true);
        expect(validatePasswordMatch(undefined, undefined)).toBe(true);
        expect(validatePasswordMatch(null, undefined)).toBe(false);
        expect(validatePasswordMatch("a", undefined)).toBe(false);
    });
});
