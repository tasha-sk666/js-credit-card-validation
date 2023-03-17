/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
import { el } from "redom";
import { Form } from "./Form";

export class App {
  constructor() {
    this.el = el(
      ".container.px-5",
      el(".text-center.mb-5", el("h1.display-4", "Форма оплаты")),
      el(
        ".row.g-4",
        el(".col-md-5", (this.form = new Form())),
        el(
          ".col-md-7",
          el("h4.text-center", "Номера карт для проверки"),
          el(
            "ul",
            el("li", "JCB: 3562997221541122, 3562992705652768"),
            el("li", "DINERS CLUB: 36076951825239, 36076987553631"),
            el("li", "MAESTRO: 676896463897, 677194455213"),
            el("li", "MASTERCARD: 5244685977061855, 5189016990620591"),
            el("li", "AMEX: 379990672334229, 372001239445826"),
            el("li", "DISCOVER: 6013002534340532"),
            el("li", "VISA: 4018934028798793, 4000241826175400"),
            el("li", "ELO: 5098263533705089")
          )
        )
      )
    );
  }
}
