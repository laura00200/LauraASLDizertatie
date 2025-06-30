const { isValidEmail } = require('../utilsTest/validation');

describe("isValidEmail", () => {
    it("accepts standard emails", () => {
        expect(isValidEmail("alice@example.com")).toBe(true);
        expect(isValidEmail("bob123@sub.domain.co")).toBe(true);
    });

    it("rejects missing @ or domain", () => {
        expect(isValidEmail("no-at-symbol.com")).toBe(false);
        expect(isValidEmail("no-domain@")).toBe(false);
    });

    it("rejects spaces or invalid chars", () => {
        expect(isValidEmail("bad email@example.com")).toBe(false);
        expect(isValidEmail("foo@exa mple.com")).toBe(false);
    });

    it("rejects non-string inputs", () => {
        expect(isValidEmail(undefined)).toBe(false);
        expect(isValidEmail(null)).toBe(false);
        expect(isValidEmail(12345)).toBe(false);
    });
});
