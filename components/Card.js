class Card {
  // handleImageClick as a parameter
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    // assign handleImageClick to this object
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (event) => {
        event.target.classList.toggle("card__like-button_active");
        console.log(this._cardElement);
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._cardElement.remove();
        this._cardElement = null;
      });

    // pass name and link as arguments to handler
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  // _handleLikeIcon() {}
  // _handleDeleteCard() {}
  // _handlePreviewPicture() {}

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
    // return the card element
  }
}
export default Card;
