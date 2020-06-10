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

const popupZoom = document.querySelector('.popup_zoom');
const popupZoomImage = document.querySelector('.popup__zoom-image');
const popupZoomTitle = document.querySelector('.popup__zoom-title');
const buttonCloseZoom = document.querySelector('.button__close_zoom');

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

const formInput = Array.from(document.querySelectorAll('.form__input'));

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

//сбрасывание ошибок валидации
function removeInput(obj) {
  const inputList = Array.from(obj.querySelectorAll(formObj.inputSelector));
  inputList.forEach((formElement) => {
    hideInputError(obj, formElement, formObj);
  });
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
function togglePopup(popupElement) {
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
  //сброс кнопки сабмит
  toggleButtonState(formInput, submitButtonProfile, formObj);
  removeInput(formSelectorProfile);
  togglePopup(popupProfile);
});

//сохранение карточки
formSelectorImage.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cards = {
    name: inputImageName.value,
    link: inputImageLink.value
  };
  inputImageName.value = '';
  inputImageLink.value = '';
  displayCards(cards);
  //сброс кнопки сабмит
  toggleButtonState(formInput, submitButtonImage, formObj);
  removeInput(formSelectorImage);
  togglePopup(popupImage);

});

//функция для кнопки лайк
function handleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

//функция для удаления карточки
function trashCards(evt) {
  evt.target.closest('.element').remove();
}

// Создание карточек
function addCards(name, link) {
  const elementCards = elementTemplate.cloneNode(true);
  const elementImage = elementCards.querySelector('.element__image');
  elementImage.src = link;
  elementCards.querySelector('.element__title').textContent = name;
  //кнопка лайк
  elementCards.querySelector('.element__like').addEventListener('click', handleLike);
  //удаление карточки
  elementCards.querySelector('.element__trash').addEventListener('click', trashCards);
  //увеличение карточки
  elementImage.addEventListener('click', function () {
    popupZoomImage.src = link;
    popupZoomTitle.textContent = name;
    togglePopup(popupZoom);
  });

  return elementCards;
}

//отображение карточек на странице
function displayCards(item) {
  elements.prepend(addCards(item.name, item.link));
}

initialCards.forEach(displayCards);

popupEditButton.addEventListener('click', () => togglePopup(popupProfile));
buttonCloseProfile.addEventListener('click', () => togglePopup(popupProfile));

popupAddButton.addEventListener('click', () => togglePopup(popupImage));
buttonCloseImage.addEventListener('click', () => togglePopup(popupImage));

buttonCloseZoom.addEventListener('click', () => togglePopup(popupZoom));

popupProfile.addEventListener('mousedown', closePopupOverlay);
popupImage.addEventListener('mousedown', closePopupOverlay);
popupZoom.addEventListener('mousedown', closePopupOverlay);

