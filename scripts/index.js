const popupProfile = document.querySelector('.popup_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.popup__input_name');
const inputProfession = document.querySelector('.popup__input_profession');

const popupImage = document.querySelector('.popup_image');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseImage = document.querySelector('.popup__close_image');
const inputImageName = document.querySelector('.popup__input_name-image');
const inputImageLink = document.querySelector('.popup__input_link-image');

const popupZoom = document.querySelector('.popup_zoom');
const popupZoomImage = document.querySelector('.popup__zoom-image');
const popupZoomTitle = document.querySelector('.popup__zoom-title');
const popupCloseZoom = document.querySelector('.popup__close_zoom');

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

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

//открытие и закрытие попапов
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

//сохренение профиля
popupProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  inputName.value = 'Жак-Ив Кусто';
  inputProfession.value = 'Исследователь океана';
  togglePopup(popupProfile);
});

//сохранение карточки
popupImage.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cards = {
    name: inputImageName.value,
    link: inputImageLink.value
  };
  inputImageName.value = '';
  inputImageLink.value = '';
  displayCards(cards);
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
popupCloseProfile.addEventListener('click', () => togglePopup(popupProfile));

popupAddButton.addEventListener('click', () => togglePopup(popupImage));
popupCloseImage.addEventListener('click', () => togglePopup(popupImage));

popupCloseZoom.addEventListener('click', () => togglePopup(popupZoom));


