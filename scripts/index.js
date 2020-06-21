import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupProfile = document.querySelector('.popup_profile');
const formSelectorProfile = document.querySelector('.form__container_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.button__close_profile');
const submitButtonProfile = document.querySelector('.button__submit_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.form__input_name');
const inputProfession = document.querySelector('.form__input_profession');

const popupImage = document.querySelector('.popup_image');
const formSelectorImage = document.querySelector('.form__container_image');
const popupAddButton = document.querySelector('.profile__add-button');
const buttonCloseImage = document.querySelector('.button__close_image');
const submitButtonImage = document.querySelector('.button__submit_image');
const inputImageName = document.querySelector('.form__input_name-image');
const inputImageLink = document.querySelector('.form__input_link-image');

export const popupZoom = document.querySelector('.popup_zoom');
export const popupZoomImage = document.querySelector('.popup__zoom-image');
export const popupZoomTitle = document.querySelector('.popup__zoom-title');
const buttonCloseZoom = document.querySelector('.button__close_zoom');

const initialCards = [

  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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

//сбрасывание ошибок валидации
function removeInput() {
  const inputList = Array.from(document.querySelectorAll(formObj.inputSelector));
  inputList.forEach((input) => {
    input.classList.remove(formObj.inputErrorClass);
  })
  const errorElement = Array.from(document.querySelectorAll('.form__input-error'));
  errorElement.forEach((error) => {
    error.classList.remove(formObj.errorClass);
    error.textContent = '';
  })
}

//закрытие попапа кликом на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}

//закрытие попапа кнопкой Esc
function closeEsc(evt, popupElement) {
  if (evt.key === 'Escape') {
    popupElement.classList.remove('popup_opened');
  }
}

//открытие и закрытие попапов
export function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
  if (popupElement.classList.contains('popup_opened')) {
    document.addEventListener('keydown', (element) => closeEsc(element, popupElement));
  } else {
    document.removeEventListener('keydown', (element) => closeEsc(element, popupElement));
  }
}

//сохренение профиля
formSelectorProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  togglePopup(popupProfile);
})

//сохранение карточки
formSelectorImage.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cards = {
    name: inputImageName.value,
    link: inputImageLink.value
  };
  displayCards(cards)
  togglePopup(popupImage);
})

//отображение карточек на странице
function displayCards(item) {
  const cards = new Card(item, '#element-template');
  const cardElement = cards.generateCard();
  const elements = document.querySelector('.elements');
  elements.prepend(cardElement);
}

initialCards.forEach(displayCards);

//слушатели формы профиля
popupEditButton.addEventListener('click', () => {
  //что бы оставалось текущие значения имени и профессии в инпутах
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  //сбрасывание ошибок валидации
  removeInput(formSelectorProfile);
  //сброс кнопки сабмит
  submitButtonProfile.classList.add(formObj.inactiveButtonClass);
  togglePopup(popupProfile);
})

buttonCloseProfile.addEventListener('click', () => togglePopup(popupProfile));

//слушатели формы добавления карточек
popupAddButton.addEventListener('click', () => {
  //очистка импутов
  formSelectorImage.reset();
  //сбрасывание ошибок валидации
  removeInput(formSelectorImage);
  //сброс кнопки сабмит
  submitButtonImage.classList.add(formObj.inactiveButtonClass);
  togglePopup(popupImage);
})

buttonCloseImage.addEventListener('click', () => togglePopup(popupImage));

//слушатели просмотра карточки
buttonCloseZoom.addEventListener('click', () => togglePopup(popupZoom));

//слушатели закрытия попапов по клику на оверлей
popupProfile.addEventListener('mousedown', closePopupOverlay);
popupImage.addEventListener('mousedown', closePopupOverlay);
popupZoom.addEventListener('mousedown', closePopupOverlay);



