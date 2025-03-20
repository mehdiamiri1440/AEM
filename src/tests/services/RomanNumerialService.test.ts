import { RomanNumeralService } from "@services/RomanNumeralService";

describe("RomanNumeralService", () => {
  test("should correctly convert numbers to Roman numerals", () => {
    expect(RomanNumeralService.toRoman(1)).toBe("I");
    expect(RomanNumeralService.toRoman(5)).toBe("V");
    expect(RomanNumeralService.toRoman(10)).toBe("X");
    expect(RomanNumeralService.toRoman(50)).toBe("L");
    expect(RomanNumeralService.toRoman(100)).toBe("C");
    expect(RomanNumeralService.toRoman(500)).toBe("D");
    expect(RomanNumeralService.toRoman(1000)).toBe("M");
    expect(RomanNumeralService.toRoman(3999)).toBe("MMMCMXCIX");
  });

  test("should throw error for numbers out of range", () => {
    expect(() => RomanNumeralService.toRoman(0)).toThrow(
      "Number out of range (1-3999)"
    );
    expect(() => RomanNumeralService.toRoman(4000)).toThrow(
      "Number out of range (1-3999)"
    );
  });
});
