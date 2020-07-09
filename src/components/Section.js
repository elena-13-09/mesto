export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
  //отрисовка карточек на странице
  renderItems() {
    this._renderedItems.forEach(item => {
      //отрисовка  каждой отдельной карточки
      this._renderer(item);
    });
  }
}
