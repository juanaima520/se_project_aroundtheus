class Card {
  constructor(
    { _id, name, link, isLiked },
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeCard
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // _setEventListeners() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .addEventListener("click", (event) => {
  //       //if(this._isLiked)
  //       event.target.classList.toggle("card__like-button_active");
  //       console.log(this._cardElement);
  //     });

  //   this._cardElement
  //     .querySelector(".card__delete-button")
  //     .addEventListener("click", () => {
  //       this._cardElement.remove();
  //       this._cardElement = null;
  //     });

  //   this._cardImage.addEventListener("click", () =>
  //     this._handleImageClick(this._name, this._link)
  //   );
  // }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this);
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleCardDelete(this);
      });

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateIsLiked(isLiked) {
    this._isLiked = isLiked; //?
    this._handleLikeIcon();
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._handleLikeIcon();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
export default Card;
