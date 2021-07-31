export class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);

    this.setEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => this._handleEscClose(e));
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