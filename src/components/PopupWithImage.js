import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(name, link) {
    super.open();
    super.setEventListeners();
    const popupZoomImage = document.querySelector('.popup__zoom-image');
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    const popupZoomTitle = document.querySelector('.popup__zoom-title');
    popupZoomTitle.textContent = name;
  }
}


