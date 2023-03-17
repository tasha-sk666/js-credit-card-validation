/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { mount } from "redom";
import { App } from "./App";
import { FormValidator } from "./FormValidator";

export const initApp = () => {
  const createApp = new App();
  mount(document.querySelector("#app"), createApp);

  const form = document.querySelector("form");
  const fields = ["number", "date", "code", "email"];
  const validator = new FormValidator(form, fields);

  validator.initialize();
};
