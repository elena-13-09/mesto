export default class Card {
  constructor(cardSelector, { data, handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._element = cardElement;
  }

  //функция для кнопки лайк
  _handleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  //функция для удаления карточки
  _trashCard() {
    this._element.remove();
  }

  // установка слушателей
  _setEventListeners() {

    //просмотр карточек
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    })

    //кнопка лайк
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    })

    //удаление карточки
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._trashCard();
    })
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}

