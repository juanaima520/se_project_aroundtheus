import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._popupImageTitle =
      this._popupElement.querySelector(".modal__image-name");
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageTitle.textContent = data.name;
    super.open();
  }
}
export default PopupWithImage;
