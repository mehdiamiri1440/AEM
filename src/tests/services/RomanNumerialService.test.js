"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RomanNumeralService_1 = require("@services/RomanNumeralService");
describe("RomanNumeralService", () => {
    test("should correctly convert numbers to Roman numerals", () => {
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(1)).toBe("I");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(5)).toBe("V");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(10)).toBe("X");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(50)).toBe("L");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(100)).toBe("C");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(500)).toBe("D");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(1000)).toBe("M");
        expect(RomanNumeralService_1.RomanNumeralService.toRoman(3999)).toBe("MMMCMXCIX");
    });
    test("should throw error for numbers out of range", () => {
        expect(() => RomanNumeralService_1.RomanNumeralService.toRoman(0)).toThrow("Number out of range (1-3999)");
        expect(() => RomanNumeralService_1.RomanNumeralService.toRoman(4000)).toThrow("Number out of range (1-3999)");
    });
});
