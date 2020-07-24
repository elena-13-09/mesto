import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector('.form__container');
  }

  //собирает данные всех полей формы
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      //this._formValues = Object.fromEntries(new FormData(this._form));
    });
    return this._formValues;
  }

  //обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    })
  }

  //закрытие попапа
  close() {
    super.close()
    this._form.reset();
  }

  //UX процесс загрузки
  loading(loading) {
    if (loading) {
      this._form.querySelector('.button__submit').textContent = 'Сохранение..';
    } else {
      this._form.querySelector('.button__submit').textContent = 'Сохранить';
    }
  }
}
