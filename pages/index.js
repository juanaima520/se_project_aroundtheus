import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const addCardForm = profileAddModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function handleModalClose(event) {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__close")
  ) {
    closePopup(event.currentTarget);
  }
}
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleModalClose);
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleModalClose);
  document.removeEventListener("keydown", handleEscClose);
  // TODO remove listener from document
}
function renderCard(cardData) {
  // const cardElement = getCardElement(cardData);
  const element = createCard(cardData);
  // 1. create an instance
  // 2. pass element to prepend
  cardListEl.prepend(element);
}
function createCard(cardData) {
  const cardSelector = "#card-template";
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function handleImageClick(name, link) {
  openPopup(previewImageModal);
  previewImage.src = link;
  previewImage.alt = name;
  previewImageName.textContent = name;
}

// validation
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const editFormElement = profileEditModal.querySelector(".modal__form");
// const addFormElement = profileAddModal.querySelector(".modal__form");
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

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
    openPopup(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageName.textContent = cardData.name;
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
  closePopup(profileEditModal);
  // profileEditModal.classList.remove("modal_opened");
}
function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardListEl);
  closePopup(profileAddModal);
  addCardForm.reset();
}

// function handleImageClick(e) {
//   e.preventDefault();
//   closePopup(previewImageModal);
// }
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

// TODO  remove these closee listeners
profileAddButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});
// profileModalCloseButton.addEventListener("click", () => {
//   closePopup(profileEditModal);
// });
// addCardModalCloseButton.addEventListener("click", () => {
//   closePopup(profileAddModal);
// });
// // profileEditModal.classList.remove("modal_opened");
// previewImageCloseButton.addEventListener("click", () => {
//   closePopup(previewImageModal);
// });

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleProfileAddSubmit);

// for (let i = 0; i < initialCards.length; i++) {
//   const card = initialCards[i];
// }

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
