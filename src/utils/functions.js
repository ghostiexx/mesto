import { cardTemplate, cardsContainer } from "./constants.js";
import { Card } from '../components/Сard.js';
import { popupWithImage, cardSection, userInfo, api } from '../pages/index.js';

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
  api.editProfile(name, description);
  userInfo.setUserInfo({ name, description });
}

export function addFormHandler(event, values) {
  event.preventDefault();

  const popupSaveBtn = event.target.querySelector('.popup__save');
  const { place, link } = values;
  const card = renderCard(link, place);

  api.addCard(place, link);
  cardsContainer.prepend(card.generateCard());
  popupSaveBtn.classList.add('popup__save_disabled');
  popupSaveBtn.setAttribute('disabled', true);
}

export function updateAvatarHandler(event, values) {
  event.preventDefault();

  const { link } = values;

  api.updateAvatar(link);
  userInfo.setUserAvatar(link);
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
      deleteCardHandler: () => api.deleteCard(newCard.getCardId()),
      setLikeHandler: () => {
        api.setLike(newCard.getCardId())
          .then(data => {
            newCard.setLike(data.likes.length);
          })
      },
      deleteLikeHandler: () => {
        api.removeLike(newCard.getCardId())
          .then(data => {
            newCard.deleteLike(data.likes.length);
          })
      }
    }
  );

  return newCard;
}