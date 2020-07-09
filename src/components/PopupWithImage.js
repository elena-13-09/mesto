import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
 constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    super.open();
    const popupZoomImage = document.querySelector('.popup__zoom-image');
    popupZoomImage.src = data.link;
    popupZoomImage.alt = data.alt;
    const popupZoomTitle = document.querySelector('.popup__zoom-title');
    popupZoomTitle.textContent = data.name;
  }
}




