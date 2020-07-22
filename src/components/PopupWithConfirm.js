import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._formSubmit = formSubmit;
    this.PopupWithConfirm = this.PopupWithConfirm.bind(this);
  }

  //обработчик сабмита удаление карточки
  PopupWithConfirm(evt) {
    evt.preventDefault();
    this._formSubmit(this._element, this._id);
    super.close();
  }

  open(id, deleteCard) {
    super.open();
    this._element = deleteCard;
    this._id = id;
    this._popupSelector.addEventListener('submit', this.PopupWithConfirm);
  }

  close() {
    super.close();
    this._popupSelector.removeEventListener('submit', this.PopupWithConfirm);
  }
}

