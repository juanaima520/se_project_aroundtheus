import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";

import {
  initialCards,
  profileEditButton,
  profileEditModal,
  profileEditForm,
  profileAddButton,
  profileAddModal,
  addCardForm,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardTitleInput,
  cardUrlInput,
  validationSettings,
  cardListEl,
  cardSelector,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const handleProfileAddSubmit = ({ name, link }) => {
  addCardForm.reset();
  renderCard({ name, link });
  addCardPopup.close();
  // closePopup(profileAddModal);
  formValidators["add-card-form"].disabledSubmitButton();
};

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleProfileAddSubmit
);
addCardPopup.setEventListeners();

const handleProfileEditSubmit = ({ title, description }) => {
  userInfo.setUserInfo({ name: title, description: description });
  // closePopup(profileEditModal);
  profileEditPopup.close();
};

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  profileEditPopup.open();
  // openPopup(profileEditModal);
});

// TODO  remove these closee listeners
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

// function handleImageClick(e) {
//   e.preventDefault();
//   previewImagePopup.close();
//   // closePopup(previewImageModal);
// }
function handleImageClick(name, link) {
  previewImagePopup.open({ name, link });
  // openPopup(previewImageModal);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, "#card-template");
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

function createCard(cardData, cardSelector) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, cardSelector);
  cardListEl.prepend(cardElement);
}

// validation
// const editFormValidator = new FormValidator(
//   validationSettings,
//   profileEditForm
// );
// const addFormValidator = new FormValidator(validationSettings, addCardForm);
// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

const formValidators = {
  // 'add-card-form': "the actual instance of the formvalidator class for the add-card modal"
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");
    // Here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
