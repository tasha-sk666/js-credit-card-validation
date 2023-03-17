/* eslint-disable no-unused-vars */
/* eslint-disable jest/expect-expect */
import { number, cvv } from "card-validator";

describe("Validator", () => {
  describe(".number", () => {
    test("Валидация номера карты пропускает корректный номер карты", () => {
      const numberValidation = number("3562997221541122");
      expect(numberValidation.isValid).toBe(true);
    });

    test("Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы", () => {
      const numberValidation = number("Aбв123@/.abC");
      expect(numberValidation.isValid).toBe(false);
    });

    test("Валидация номера карты не пропускает строку с недостаточным количеством цифр", () => {
      const numberValidation = number("0012456");
      expect(numberValidation.isValid).toBe(false);
    });

    test("Валидация номера карты не пропускает строку со слишком большим количеством цифр (например, 25)", () => {
      const numberValidation = number("0000123464377384384798381");
      expect(numberValidation.isValid).toBe(false);
    });
  });

  describe(".code", () => {
    test("Валидация CVV/CVC пропускает строку с тремя цифровыми символами", () => {
      const cvvValidation = cvv("999");
      expect(cvvValidation.isValid).toBe(true);
    });

    test("Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами", () => {
      const cvvValidation = cvv("21");
      expect(cvvValidation.isValid).toBe(false);
    });

    test("Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами", () => {
      const cvvValidation = cvv("12345");
      expect(cvvValidation.isValid).toBe(false);
    });

    test("Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания)", () => {
      const cvvValidation = cvv("abc");
      expect(cvvValidation.isValid).toBe(false);
    });
  });
});
