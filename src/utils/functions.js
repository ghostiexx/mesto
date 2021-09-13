import { cardTemplate, cardsContainer, userId } from "./constants.js";
import { Card } from '../components/Сard.js';
import { 
  popupWithImage, 
  updateAvatarPopup, 
  popupWithAddForm, 
  popupWithEditForm, 
  confirmDeletePopup, 
  userInfo, 
  api 
} from '../pages/index.js';

export function setInputValues(userInfo) {
  const nameFiled = document.querySelector('.popup__input_type_name');
  const descriptionFiled = document.querySelector('.popup__input_type_description');
  const { name, description } = userInfo.getUserInfo();

  nameFiled.value = name;
  descriptionFiled.value = description;
}

export function editFormHandler(event, values) {
  event.preventDefault();

  const { name, description } = values;

  popupWithEditForm.setButtonTextContent();
  api.editProfile(name, description)
    .then(function() {
      userInfo.setUserInfo({ name, description });
    })
    .catch(error => alert(`Ошибка: ${error}`))
    .finally(() => {
      popupWithEditForm.close();
      popupWithEditForm.setButtonTextContent('Сохранить');
    })
}

export function addFormHandler(event, values) {
  event.preventDefault();

  const popupSaveBtn = event.target.querySelector('.popup__save');
  const { place, link } = values;

  popupWithAddForm.setButtonTextContent();
  api.addCard(place, link)
    .then(response => {
      const card = renderCard(link, place, response._id, response.owner._id, userId, response.likes);
      cardsContainer.prepend(card.generateCard());
    })
    .catch(error => alert(`Ошибка: ${error}`))
    .finally(() => {
      popupWithAddForm.close();
      popupWithAddForm.setButtonTextContent('Сохранить');

      popupSaveBtn.classList.add('popup__save_disabled');
      popupSaveBtn.setAttribute('disabled', true);
    })
}

export function updateAvatarHandler(event, values) {
  event.preventDefault();

  const { newAvatar } = values;

  updateAvatarPopup.setButtonTextContent();
  api.updateAvatar(newAvatar)
    .then(response => {
      userInfo.setUserAvatar(response.avatar);
    })
    .catch(error => alert(`Ошибка: ${error}`))
    .finally(() => {
      updateAvatarPopup.close();
      updateAvatarPopup.setButtonTextContent('Сохранить');
    })
}

export function renderCard(link, place, cardId, ownerId, currentUser, likesAmount) {
  const newCard = new Card(
    cardTemplate,
    { imageURI: link, title: place },
    cardId,
    ownerId,
    currentUser,
    likesAmount,
    {
      handleCardClick: () => popupWithImage.open(link, place),
      deleteCardHandler: () => {
        confirmDeletePopup.open();
        confirmDeletePopup.setSubmitHandler(function() {
          confirmDeletePopup.setButtonTextContent('Удаление...');
          api.deleteCard(newCard.getCardId())
            .then(function() {
              newCard.deleteCard();
            })
            .catch(error => alert(`Ошибка: ${error}`))
            .finally(() => {
              confirmDeletePopup.close();
              confirmDeletePopup.setButtonTextContent('Да');
            })
        })
      },
      setLikeHandler: () => {
        api.setLike(newCard.getCardId())
          .then(data => {
            newCard.setLike(data.likes.length);
          })
          .catch(error => alert(`Ошибка: ${error}`))
      },
      deleteLikeHandler: () => {
        api.removeLike(newCard.getCardId())
          .then(data => {
            newCard.deleteLike(data.likes.length);
          })
          .catch(error => alert(`Ошибка: ${error}`))
      }
    }
  );

  return newCard;
}