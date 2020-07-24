import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._popupWithConfirm = this._popupWithConfirm.bind(this);
  }

  handleSubmit(deleteCard) {
    this._formSubmit = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  //обработчик сабмита удаления карточки
  _popupWithConfirm(evt) {
    evt.preventDefault();
    this._formSubmit();
  }

  open() {
    super.open();
    this._popupSelector.addEventListener('submit', this._popupWithConfirm);
  }

  close() {
    super.close();
    this._popupSelector.removeEventListener('submit', this._popupWithConfirm);
  }
}

