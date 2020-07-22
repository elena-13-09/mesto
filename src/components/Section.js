export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }
  //отрисовка карточек на странице
  renderItems(item) {
    item.forEach((item) => {
      //отрисовка  каждой отдельной карточки
      this._renderer(item);
    });
  }
}
