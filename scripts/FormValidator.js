export default class FormValidator {
  constructor(obj, formElement) {
  this._obj = obj;
  this._formElement = formElement;
}

//добавление класса с ошибкой
_showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
}

//удаление класса с ошибкой
_hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
}

//проверка валидности поля
_checkInputValidity(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    this._hideInputError(formElement, inputElement, obj);
  }
}

//проверка валидности полей
_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//активация кнопки
_toggleButtonState(inputList, buttonElement, obj) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//слушатели проверки валидности полей
_setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  this._toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(formElement, inputElement, obj);
      // чтобы проверять его при изменении любого из полей
      this._toggleButtonState(inputList, buttonElement, obj);
    })
  })
}

//активация валидации полей
enableValidation() {
    this._setEventListeners(this._formElement, this._obj);
  }
}



