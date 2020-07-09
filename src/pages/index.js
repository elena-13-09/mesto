import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const formSelectorProfile = document.querySelector('.form__container_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.form__input_name');
const inputProfession = document.querySelector('.form__input_profession');

const formSelectorImage = document.querySelector('.form__container_image');
const popupAddButton = document.querySelector('.profile__add-button');
const submitButtonImage = document.querySelector('.button__submit_image');

const initialCards = [

  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

const formObj = {
  formSelector: '.form__container',
  inputSelector: '.form__input',
  submitButtonSelector: '.button__submit',
  inactiveButtonClass: 'button__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//включение валидации форм
const formProfileValidator = new FormValidator(formObj, formSelectorProfile);
formProfileValidator.enableValidation();
const formImageValidator = new FormValidator(formObj, formSelectorImage);
formImageValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_zoom');

//функция отрисовки карточек на странице, с открытием попапа просмотра карточек
function displayCards(item) {
const card = new Card('#element-template', {
  data: item, handleCardClick: () => {
    popupWithImage.open(item)
  }
})
const cardElement = card.generateCard();
CardList.addItem(cardElement);
}

//отрисовка карточек на странице
const CardList = new Section({
  items: initialCards,
  renderer: (item) => {
    displayCards(item);
  }
}, '.elements');

CardList.renderItems();

//добавление новых карточек на страницу
const formImage = new PopupWithForm({
  popupSelector: '.popup_image',
  formSubmit: (item) => {
    displayCards(item);
  }
});

//редактирование профиля
const userInfo = new UserInfo('.profile__name', '.profile__profession');

const formProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  formSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
})

//слушатели формы добавления карточек
popupAddButton.addEventListener('click', () => {
  //очистка импутов
  //formSelectorImage.reset();
  //сбрасывание ошибок валидации
  formImageValidator.removeInput();
  //сброс кнопки сабмит
  formImageValidator.inactiveButtonAdd(submitButtonImage);
  formImage.open();
});

//слушатели формы профиля
popupEditButton.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  //что бы оставалось текущие значения имени и профессии в инпутах
  inputName.value = profile.name;
  inputProfession.value = profile.profession;
  //сбрасывание ошибок валидации
  formProfileValidator.removeInput();
  formProfile.open()
})



