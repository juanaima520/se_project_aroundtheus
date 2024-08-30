class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("modal_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      // const openPopup = document.querySelector(".modal_opened");
      // if (openPopup) {
      // closePopup(openPopup);
      this.close();
    }
  };
  _handleModalClose = (event) => {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("modal__close")
    ) {
      //   closePopup(event.currentTarget);
      this.close();
    }
  };
  setEventListeners() {
    // const closeButton = this._popupElement.querySelector(".modal__close");
    // closeButton.addEventListener("click", () => {
    //   this.close();
    // });
    this._popupElement.addEventListener("click", this._handleModalClose);
  }
}
// _handleModalClose = () => {
//   setEventListeners() {
//     this._popupElement.addEventListener("mousedown", (event) => {
//   if (
//     event.target.classList.contains("modal") ||
//     event.target.classList.contains("modal__close")
//   )
//   {
//     //   closePopup(event.currentTarget);
//     this.close();
//   });
// };

export default Popup;
