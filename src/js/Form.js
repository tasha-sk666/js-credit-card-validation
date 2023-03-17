/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { el } from "redom";
import creditCardType from "credit-card-type";
import Cleave from "cleave.js";

const cardsInfo = creditCardType("");

export class Form {
  constructor() {
    this.cardIcons = el(
      ".cards-icon",
      cardsInfo.map((card) =>
        el(
          ".card-icon",
          el("img", {
            "data-icon": `${card.type}`,
            className: "d-none",
            width: "64",
            heigth: "64",
            src: `./img/${card.type}.png`,
          })
        )
      )
    );
    this.number = el(
      "label",
      { className: "mb-4 w-100" },
      el("span", "Номер карты"),
      el("input", {
        type: "text",
        name: "number",
        className: "form-control",
        placeholder: "Номер карты",
        oninput: (event) => this.numberMask(event.currentTarget),
      }),
      el(".error.form-text.text-danger")
    );
    this.date = el(
      "label",
      { className: "mb-4 w-100" },
      el("span", "Срок окончания"),
      el("input", {
        type: "text",
        name: "date",
        className: "form-control",
        placeholder: "ММ/ГГ",
        oninput: (event) => this.dateMask(event.currentTarget),
      }),
      el(".error.form-text.text-danger")
    );
    this.code = el(
      "label",
      { className: "mb-4 w-100" },
      el("span", "Код"),
      el("input", {
        type: "text",
        name: "code",
        className: "form-control",
        placeholder: "CVV/CVC",
        oninput: (event) => this.codeMask(event.currentTarget),
      }),
      el(".error.form-text.text-danger")
    );
    this.email = el(
      ".mb-2.fs-5.text-center",
      el(".mb-2", "Отправим квитанцию на email 💌"),
      el(
        "label",
        { className: "mb-4 w-100" },
        el("input", {
          type: "email",
          name: "email",
          className: "form-control",
          placeholder: "Email",
        }),
        el(".error.form-text.text-danger")
      )
    );
    this.button = el(
      "button",
      {
        className: "disabled w-100 btn btn-dark btn-lg",
        type: "submit",
      },
      "Оплатить"
    );
    this.el = el(
      "form.mx-auto",
      el(
        ".mb-4.px-3.py-4.rounded.bg-light.shadow",
        this.cardIcons,
        this.number,
        el(".row", el(".col-md", this.date), el(".col-md", this.code))
      ),
      el(".col-md-9.mx-auto", this.email, this.button)
    );
  }

  numberMask(currentElement) {
    new Cleave(currentElement, {
      creditCard: true,
      onCreditCardTypeChanged: () => {
        const icons = this.el.querySelectorAll("[data-icon]");
        const currentCardType = creditCardType(currentElement.value);
        if (currentElement.value.length > 6) {
          const setIcon = Array.from(icons).find(
            (icon) => icon.dataset.icon === currentCardType[0].type
          );

          icons.forEach((icon) => icon.classList.add("d-none"));
          setIcon.classList.remove("d-none");
        } else {
          icons.forEach((icon) => icon.classList.add("d-none"));
        }
      },
    });
  }

  dateMask(currentElement) {
    new Cleave(currentElement, {
      date: true,
      datePattern: ["m", "y"],
    });
  }

  codeMask(currentElement) {
    new Cleave(currentElement, {
      blocks: [3],
    });
  }
}
