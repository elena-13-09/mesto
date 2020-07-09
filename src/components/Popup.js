export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    //закрытие попопов нажатием на кнопку
    this._buttonClose = this._popupElement.querySelector('.button__close');
    //закрытие попапа кнопкой Esc
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
    //закрытие попапа кликом на оверлей
    this._handleOverlayClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    }
    this.setEventListeners();
  }

  //открытие попапа
  open() {
    this._popupElement.classList.add('popup_opened');
  }

  //закрытие попапа
  close() {
    this._popupElement.classList.remove('popup_opened');
  }

  //слушатели закрытия попапов
  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._handleOverlayClose);
  }
}




