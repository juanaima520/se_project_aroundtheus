const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileAddButton = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = profileAddModal.querySelector(
  "#modal-close-button"
);

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageCloseButton = previewImageModal.querySelector(
  "#modal-close-preview"
);
const previewImageName = document.querySelector(".modal__image-name");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = profileAddModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function openPopop(modal) {
  modal.classList.add("modal_opened");
}
function closePopop(modal) {
  modal.classList.remove("modal_opened");
}
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopop(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageName.textContent = cardData.name;
    return previewImageName;
  });

  // set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopop(profileEditModal);
  // profileEditModal.classList.remove("modal_opened");
}
function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  //   const cardElement = getCardElement({
  //     name,
  //     link,
  //   });
  renderCard({ name, link }, cardListEl);
  closePopop(profileAddModal);
  // profileEditModal.classList.remove("modal_opened");
  //   const newCardData = {
  //     name: name,
  //     link: link,
  //   };
  //   function createCard(cardData) {
  //     const card = new Card(cardData, cardSelector, handleCardClick);
  //     return card.getView();
  //   }
  //   const newCard = renderCard(newCardData);
  //
  //   return console.log(cardElement);
}
// section.js: export default class Section {
//     constructor({ items, renderer }, container) {
//       this._items = items;
//       this._renderer = renderer;
//       this._container = container;
//     }
//     renderItems() {
//       this._items.forEach(this._renderer);
//     }
//     addItem(item) {
//       this._container.prepend(item);
//     }
//   }
//   addItem(item) {
//       this._container.prepend(item);
//     }
function handleImageClick(e) {
  e.preventDefault();
  closePopop(previewImageModal);
}
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopop(profileEditModal);
});
profileAddButton.addEventListener("click", () => {
  openPopop(profileAddModal);
});
profileModalCloseButton.addEventListener("click", () => {
  closePopop(profileEditModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closePopop(profileAddModal);
});
// profileEditModal.classList.remove("modal_opened");
previewImageCloseButton.addEventListener("click", () => {
  closePopop(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);
// for (let i = 0; i < initialCards.length; i++) {
//   const card = initialCards[i];
// }

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
