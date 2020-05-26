const popupProfile = document.querySelector('.popup_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupClouseProfile = document.querySelector('.popup__close_profile');
const popupSubmitProfile = document.querySelector('.popup__submit_profile');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.popup__input_name');
let inputProfession = document.querySelector('.popup__input_profession');

const popupImage = document.querySelector('.popup_image');
const popupAddButton = document.querySelector('.profile__add-button');
const popupClouseImage = document.querySelector('.popup__close_image');
const popupSubmitImage = document.querySelector('.popup__submit_image');
let inputImageName = document.querySelector('.popup__input_name-image');
let inputImageLink = document.querySelector('.popup__input_link-image');

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

//открытие попапов
function openPopup(popupElement) {
 popupElement.classList.toggle('popup_opened');
}

//попап, форма редактирования профиля
function formOpenedProfile() {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    openPopup(popupProfile);
}

//сохренение профиля
function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  formOpenedProfile()
}

//попап, форма для добавления карточек
function formOpenedImage() {
openPopup(popupImage);
}

//сохранение карточки
function formSubmitImage(evt) {
  evt.preventDefault();
  elements.prepend(addCards(inputImageName.value, inputImageLink.value));
  formOpenedImage(popupImage);
}
//попап для просмотра карточки
function formOpenedZoom() {
  openPopup(popupZoom);
  }

// Создание карточек
function addCards(name, link) {
const elementCards = elementTemplate.cloneNode(true);
const image = elementCards.querySelector('.element__image');
image.src = link;
image.name = name;
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
  openPopup(popupZoom);
});

return elementCards;
}

//отображение карточек на странице
initialCards.forEach(function(item) {
  elements.append(addCards(item.name, item.link));
});

popupEditButton.addEventListener('click', formOpenedProfile);
popupClouseProfile.addEventListener('click', formOpenedProfile);
popupProfile.addEventListener('submit', formSubmitProfile);

popupAddButton.addEventListener('click', formOpenedImage);
popupClouseImage.addEventListener('click',formOpenedImage);
popupImage.addEventListener('submit', formSubmitImage);

popupClouseZoom.addEventListener('click', formOpenedZoom);
