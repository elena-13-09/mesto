export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    //закрытие попопов нажатием на кнопку
    this._buttonClose = this._popupSelector.querySelector('.button__close');
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
  }

  //открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleOverlayClose);
  }

  //закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleOverlayClose);
  }

  //слушатели закрытия попапов
  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
  }
}




