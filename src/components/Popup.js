export class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._submitBtn = this._popup.querySelector('.popup__save');

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setButtonTextContent(text = "Сохранение...") {
    if (this._submitBtn) this._submitBtn.textContent = text;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
          this.close();
      }
  })
  }
}