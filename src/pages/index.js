import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";

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

const avatarEditButton = document.querySelector("#avatar-edit-button");
const avatarForm = document.querySelector("#modal__form-avatar");
const profileImage = document.querySelector(".profile__image");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "65820eda-9ddf-4d15-8d65-d12582853dbd",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const handleProfileAddSubmit = ({ name, link }) => {
  addCardPopup.renderLoading(true);
  api
    .addNewCard({ name, link })
    .then((cardData) => {
      renderCard(cardData);
      addCardPopup.close();
      formValidators["add-card-form"].disabledSubmitButton();
    })
    .catch((err) => {
      console.error(err);
      alert(`Error ${err}. Could not add card.`);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
};

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleProfileAddSubmit
);
addCardPopup.setEventListeners(); //indented

const handleProfileEditSubmit = ({ title, description }) => {
  profileEditPopup.renderLoading(true);
  api
    .editUserInfo(title, description)
    .then((userData) => {
      userInfo.setUserInfo({ name: title, description: description });
      profileEditPopup.close(); //close the edit-profile modal
    })
    .catch((err) => {
      console.error(err);
      alert(`Error ${err}. Could not edit user info.`);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });

  // closePopup(profileEditModal);
};

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(
  "#profile-avatar-modal",
  (formData) => {
    avatarEditPopup.renderLoading(true);
    api
      .updateAvatar(formData.link)
      .then((res) => {
        userInfo.changeAvatar(res.avatar);
        avatarEditPopup.close();
      })
      .catch((err) => console.log("Error updating avatar:", err))
      .finally(() => {
        avatarEditPopup.renderLoading(false);
      });
  }
);
avatarEditPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
});
const confirming = new PopupDelete("#delete-card-modal");
confirming.setEventListeners();
// runs when you click on the trash icon of a card
function handleDelete(card) {
  confirming.open();
  confirming.setConfirmSubmit(() => {
    // runs when you click 'yes' on the delete-card modal
    //confirming.renderLoading(true);
    confirming.setSubmitButtonText("Deleting...yay");
    api
      .deleteCard(card.id)
      .then(() => {
        confirming.close();
        card.handleCardDelete();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        //confirming.renderLoading(false);
        confirming.setSubmitButtonText("Yes");
      });
  });
}

function handleLikeCard(card) {
  if (card.getIsLiked()) {
    api
      .removeLike(card.id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(card.id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => console.log(err));
  }
}

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

// initialCards.forEach((item) => {
//   section._renderer(item);
// });
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDelete,
    handleLikeCard
  );
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
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
//const cardElement = getCardElement(cardData);
//cardListEl.prepend(cardElement);

//runs on page load
// gets user info from server and sets it on the dom
// api
//   .getUserInfo()
//   .then((userData) => {
//     console.log(userData); //{name: sldjf, about: skdf}

//   })
// .catch((err) => {
//   console.error(err);
//   alert(`Error ${err}. Could not get user info.`);
// });

const section = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".cards__list"
);

//gets the cards off the server
// api.getInitialCards().then((cards) => {

//   console.log(cards);
// });
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCardData, userData]) => {
    section.setItems(initialCardData.reverse());
    section.renderItems();
    userInfo.setUserInfo({ name: userData.name, description: userData.about });
    userInfo.changeAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
    // alert(`Error ${err}. Could not get user info.`);
  });
