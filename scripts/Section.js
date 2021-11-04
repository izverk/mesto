export default class Section {
  constructor({ initialCards: items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }
  addItem(element) {
    document.querySelector(this._containerSelector).prepend(element);
  }
}
