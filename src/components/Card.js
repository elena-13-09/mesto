export default class Card {
  constructor(cardSelector, userId, { handleAddLike, handleDeleteLike, data, handleCardClick, handleConfirmClick }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardId = data.owner._id;
    this._userId = userId._id;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
  }

  //разметка карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._element = cardElement;

  }

  //довавление и удаление лайка
  _containsLike() {
    this._element.querySelector('.element__like').classList.contains('element__like_active')
      ? this._handleDeleteLike()
      : this._handleAddLike();
  }

  toggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  //количество лайков
  numberLike(like) {
    this._element.querySelector('.element__like-number').textContent = like.length
  }

  //функция для удаления карточки
  trashCard() {
    this._element.remove();
    this._element = null;
  }

  //установка слушателей
  _setEventListeners() {
    //просмотр карточек
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    //кнопка лайк
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._containsLike();
    })
    //удаление карточки
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleConfirmClick();
    })
  }

  //карточка с данными
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-number').textContent = this._likes.length;
    //показывает иконку удаления только на своих карточках
    if (this._cardId !== this._userId) {
      this._element.querySelector('.element__trash').style.display = 'none';
    }
    //показывает свои лайки
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
      }
    })
    return this._element;
  }
}


