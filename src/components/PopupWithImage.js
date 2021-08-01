import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._popupCaption = this._popup.querySelector('.popup__caption');
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open(link, title) {
    super.open();

    this._popupCaption.textContent = title;
    this._popupImage.src = link;
    this._popupImage.alt = title;
  }
}