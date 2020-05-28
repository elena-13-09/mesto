const popupProfile = document.querySelector('.popup_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupClouseProfile = document.querySelector('.popup__close_profile');
const popupSubmitProfile = document.querySelector('.popup__submit_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.popup__input_name');
const inputProfession = document.querySelector('.popup__input_profession');

const popupImage = document.querySelector('.popup_image');
const popupAddButton = document.querySelector('.profile__add-button');
const popupClouseImage = document.querySelector('.popup__close_image');
const popupSubmitImage = document.querySelector('.popup__submit_image');
const inputImageName = document.querySelector('.popup__input_name-image');
const inputImageLink = document.querySelector('.popup__input_link-image');

const popupZoom = document.querySelector('.popup_zoom');
const popupZoomImage = document.querySelector('.popup__zoom-image');
const popupZoomTitle = document.querySelector('.popup__zoom-title');
const popupClouseZoom = document.querySelector('.popup__close_zoom');

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

let elementTemplate = document.querySelector('#element-template').content;
let elements = document.querySelector('.elements');

//открытие и закрытие попапов
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

//сохренение профиля
function formSubmitProfile(evt) {
  evt.preventDefault(); {
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    togglePopup(popupProfile)
  }
  inputName.value = '';
  inputProfession.value = '';
}

//сохранение карточки
function formSubmitImage(evt) {
  evt.preventDefault();
  const Cards = {
    name: inputImageName.value,
    link: inputImageLink.value
  };
  displayCards(Cards);
  inputImageName.value = '';
  inputImageLink.value = '';
  togglePopup(popupImage);
}

// Создание карточек
function addCards(name, link) {
  const elementCards = elementTemplate.cloneNode(true);
  elementCards.querySelector('.element__image').src = link;
  elementCards.querySelector('.element__title').textContent = name;
  //кнопка лайк
  elementCards.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //удаление карточки
  elementCards.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  //увеличение карточки
  elementCards.querySelector('.element__image').addEventListener('click', function (evt) {
    evt.target.classList.toggle('popup_opened');
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
popupClouseProfile.addEventListener('click', () => togglePopup(popupProfile));
popupProfile.addEventListener('submit', formSubmitProfile);

popupAddButton.addEventListener('click', () => togglePopup(popupImage));
popupClouseImage.addEventListener('click', () => togglePopup(popupImage));
popupImage.addEventListener('submit', formSubmitImage);

popupClouseZoom.addEventListener('click', () => togglePopup(popupZoom));;


