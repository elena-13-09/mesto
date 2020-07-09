import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._formSubmit = formSubmit;
  }
  //собирает данные всех полей формы
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  //слушатели, добавлен обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }
  //закрытие попапа, добавлено очищение импутов
  close() {
    super.close()
    this._popupElement.querySelector('.form__container').reset();
  }
}
