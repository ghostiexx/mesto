export class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  _clearContainer() {
    this._container.innerHtml = '';
  }

  addItem(item) {
    this._container.prepend(item);
  }

  render(array) {
    this._clearContainer();
    
    array.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}