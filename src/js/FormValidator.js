/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
import { number, expirationDate, cvv } from "card-validator";

export class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnBlur();
  }

  validateOnBlur() {
    const self = this;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.fields.forEach((field) => {
      const input = document.querySelector(`[name="${field}"]`);
      const btn = this.form.querySelector('[type="submit"]');

      input.addEventListener("blur", () => {
        self.validateFields(input);

        const elements = Array.from(this.form.querySelectorAll("input")).filter(
          (element) => element.classList.contains("border-success")
        );

        elements.length === this.fields.length
          ? btn.classList.remove("disabled")
          : btn.classList.add("disabled");
      });
    });
  }

  validateFields(field) {
    if (field.name === "number") {
      const numberValidation = number(field.value);
      if (!numberValidation.isValid) {
        this.setStatus(field, "Введите валидный номер карты", "error");
      } else {
        this.setStatus(field, null, "success");
      }
    }

    if (field.name === "date") {
      const now = new Date();
      const minMonth = now.getMonth() + 2;
      const minYear = now.getFullYear().toString().slice(2, 4);
      const maxYear = Number(minYear) + 19;

      const cardDateValue = expirationDate(field.value);

      if (!cardDateValue.isValid) {
        this.setStatus(
          field,
          `Срок окончания не может быть меньше ${
            minMonth < 10 ? `0${minMonth}` : minMonth
          }/${minYear} и больше 12/${maxYear}`,
          "error"
        );
      } else {
        if (cardDateValue.month < minMonth) {
          this.setStatus(
            field,
            `Месяц не может быть меньше ${
              minMonth < 10 ? `0${minMonth}` : minMonth
            }`,
            "error"
          );
        }
        this.setStatus(field, null, "success");
      }
    }

    if (field.name === "code") {
      const cvvValidation = cvv(field.value);
      if (!cvvValidation.isValid) {
        this.setStatus(field, "Введите валидный номер кода", "error");
      } else {
        this.setStatus(field, null, "success");
      }
    }

    if (field.name === "email") {
      const isValidEmail = (email) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

      if (!isValidEmail(field.value)) {
        this.setStatus(field, "Введите корректный email адрес", "error");
      } else {
        this.setStatus(field, null, "success");
      }
    }
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error");

    if (status === "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("border-danger");
      field.classList.add("border-success");
    }

    if (status === "error") {
      field.parentElement.querySelector(".error").innerText = message;
      field.classList.remove("border-success");
      field.classList.add("border-danger");
    }
  }
}
