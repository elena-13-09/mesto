const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.profile__edit-button');
const popupClouse = document.querySelector('.popup__close');
const popupSubmit = document.querySelector('.popup__submit');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.popup__input_name');
let inputProfession = document.querySelector('.popup__input_profession');

function formOpened() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  formOpened()
}
popupButton.addEventListener('click', formOpened);
popupClouse.addEventListener('click', formOpened);
popup.addEventListener('submit', formSubmitHandler);

