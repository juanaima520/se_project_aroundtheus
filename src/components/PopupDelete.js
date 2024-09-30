import Popup from "./Popup.js";
export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(
      ".modal__button-confirm"
    );
    // this._submitButtonText = this._submitButton.textContent;
  }
  setConfirmSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  // renderLoading(isLoading, loadingText = "Deleting..") {
  //   if (isLoading) {
  //     this._submitButton.textContent = loadingText;
  //   } else {
  //     this._submitButton.textContent = this._submitButtonText;
  //   }
  // }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
