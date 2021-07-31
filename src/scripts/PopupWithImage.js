import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._popupCaption = this._popup.querySelector('.popup__caption');
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open(event) {
    super.open();

    const title = event.target.closest('.card').querySelector('.card__name').textContent;

    this._popupCaption.textContent = title;
    this._popupImage.src = event.target.src;
    this._popupImage.alt = event.target.alt;
  }
}