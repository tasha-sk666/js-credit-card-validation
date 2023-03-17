/* eslint-disable no-unused-vars */
/* eslint-disable jest/expect-expect */
import { Form } from "../src/js/Form";

describe(".DOM", () => {
  test("Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email", () => {
    const dataTest = [
      {
        name: "number",
        placeholder: "Номер карты",
      },
      {
        name: "date",
        placeholder: "ММ/ГГ",
      },
      {
        name: "code",
        placeholder: "CVV/CVC",
      },
      {
        name: "email",
        placeholder: "Email",
      },
    ];
    const createForm = new Form();

    function serializeForm(formNode) {
      const { elements } = formNode;
      const data = Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
          const { name, placeholder } = element;
          return { name, placeholder };
        });
      return data;
    }

    expect(serializeForm(createForm.el)).toHaveLength(4);
    expect(serializeForm(createForm.el)).toEqual(dataTest);
  });
});
