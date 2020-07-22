import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api';

const formSelectorProfile = document.querySelector('.form__container_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.form__input_name');
const inputProfession = document.querySelector('.form__input_profession');

const formSelectorImage = document.querySelector('.form__container_image');
const popupAddButton = document.querySelector('.profile__add-button');
const submitButtonImage = document.querySelector('.button__submit_image');

const formSelectorAvatar = document.querySelector('.form__container_avatar');
const popupEditAvatar = document.querySelector('.profile__avatar-edit');
const submitButtonAvatar = document.querySelector('.button__submit_avatar');

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'f9d42d56-f132-43be-b723-625cd27ac059',
    'Content-Type': 'application/json'
  }
}

const api = new Api(config);

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
const formAvatarValidator = new FormValidator(formObj, formSelectorAvatar);
formAvatarValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_zoom');

//попап подтверждения удаления карточки
const popupConfirm = new PopupWithConfirm({
  popupSelector: '.popup_confirm',
  formSubmit: (id, element) => {
    api.deleteCard(id)
      .then(() => {
        element.querySelector('.element__trash').closest('.element').remove();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

//отрисовка карточек на странице
const cardList = new Section({
  renderer: (item) => {
    displayCards(item);
  }
}, '.elements');

//данные с сервера
api.getInitialCards()
  .then((item) => {
    cardList.renderItems(item);
  })
  .catch((err) => {
    console.log(err);
  })


//функция отрисовки карточек на странице
function displayCards(item) {
  const card = new Card('#element-template', {
    //добавление лайка
    handleAddLike: () => {
      api.addLike(item._id);
      //удаление лайка
    }, handleDeleteLike: () => {
      api.deleteLike(item._id);
    },
    data: item,
    //просмотр карточки
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    //удаление карточки
    handleConfirmClick: (id, element) => {
      popupConfirm.open(id, element);
      popupConfirm.setEventListeners();
    }
  })
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//добавление новых карточек на страницу
const formImage = new PopupWithForm({
  popupSelector: '.popup_image',
  formSubmit: (item) => {
    formImage.loading(true);
    api.addNewCard(item.name, item.link)
      .then((item) => {
        displayCards(item);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formImage.loading(false);
      })
  }
})
formImage.setEventListeners();

//редактирование профиля
const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
//данные с сервера
api.getUserInfo()
  .then((user) => {
    userInfo.getUserInfo(user.name, user.profession, user.avatar);
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  })

const formProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  formSubmit: (data) => {
    formProfile.loading(true);
    api.editUserInfo(data.name, data.profession)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formProfile.loading(false);
      })
  }
})
formProfile.setEventListeners();

//редактирование аватара
const formAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  formSubmit: (data) => {
    formAvatar.loading(true);
    api.editUserAvatar(data.link)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAvatar.loading(false);
      })
  }
})
formAvatar.setEventListeners();

//слушатели формы добавления карточек
popupAddButton.addEventListener('click', () => {
  //сбрасывание ошибок валидации
  formImageValidator.removeInput();
  //сброс кнопки сабмит
  formImageValidator.inactiveButtonAdd(submitButtonImage);
  formImage.open();
})

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

//слушатели формы изменения аватара
popupEditAvatar.addEventListener('click', () => {
  //сбрасывание ошибок валидации
  formAvatarValidator.removeInput();
  //сброс кнопки сабмит
  formAvatarValidator.inactiveButtonAdd(submitButtonAvatar);
  formAvatar.open();
})



