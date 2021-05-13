import { popupImage, openPopup } from './index.js'

export class Card {
  constructor(template, params) {
    this._cardTemplate = template;
    this._title = params.title;
    this._imageURI = params.imageURI;
  }

  _getCardFromTemplate() {
    this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
    this._likeButton = this._cardElement.querySelector('.card__button');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__name');

  }

  _setCardInfo() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._imageURI;
    this._cardImage.alt = `Изображение ${this._title}`;
  }

  _setPopupInfo(src, title) {
    this._cardPopup = document.querySelector('.popup_type_image');
    this._frame = this._cardPopup.querySelector('.popup__image');
    this._caption = this._cardPopup.querySelector('.popup__caption');

    this._frame.src = src;
    this._caption.textContent = title;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._cardElement.remove();
      this._cardElement = null;
    });

    this._likeButton.addEventListener('click', (event) => {
      this._likeButton.classList.toggle('card__button_active');
    });

    this._cardImage.addEventListener('click', () => {
      this._setPopupInfo(this._cardImage.src, this._cardTitle.textContent);
      openPopup(popupImage);
    });
  }

  generateCard() {
    this._getCardFromTemplate();
    this._setCardInfo();
    this._setEventListeners();

    return this._cardElement;
  }
}