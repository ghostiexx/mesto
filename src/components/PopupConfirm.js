import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(selector) {
    super(selector);

    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (typeof this._submitHandler === 'function') this._submitHandler();
    });
  }
}