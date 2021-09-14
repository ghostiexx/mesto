export class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  _clearContainer() {
    this._container.innerHtml = '';
  }

  addItem(item) {
    this._container.append(this._renderer(item));
  }

  render() {
    this._clearContainer();

    if (typeof this._renderer === 'function') {
      this._items.forEach(item => {
        this.addItem(item);
      });
    }
  }
}