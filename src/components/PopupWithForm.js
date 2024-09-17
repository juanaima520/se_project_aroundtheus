import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._formButton = this._popupElement.querySelector(".modal__button");
    this._formButtonText = this._formButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__input")]; //Array.from
  }

  close() {
    super.close();
  }

  _getInputValues() {
    const inputValue = {};
    this._inputList.forEach((inputEl) => {
      inputValue[inputEl.name] = inputEl.value;
    });
    return inputValue;
  }
  setInputValues(inputValue) {
    this._inputList.forEach((inputEl) => {
      inputEl.value = inputValue[inputEl.name];
    });
  }

  renderLoading(isLoading, loadingText = "Saving..") {
    if (isLoading) {
      this._formButton.textContent = loadingText;
    } else {
      this._formButton.textContent = this._formButtonText;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
  }
}

export default PopupWithForm;

// Suggestions
// Add card modal opens with the new class
// - remove the old closing listeners from index.js
// - next get it to close with new class
// - create an instance for edit profile modal
// - remove the submission listeners from index.js
// - work on submission, utilizing existing submission handlers
