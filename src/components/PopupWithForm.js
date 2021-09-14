import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submithandler) {
    super(selector);

    this._submithandler = submithandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._values = {};

    this._inputs.forEach(input => {
      this._values[input.id] = input.value;
    });

    return this._values;
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      this._submithandler(event, this._getInputValues());
    });
  }
}