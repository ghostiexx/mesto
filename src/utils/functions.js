import { cardTemplate } from "./constants.js";
import { Card } from '../components/Сard.js';
import { popupWithImage, cardSection, userInfo } from '../pages/index.js';

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
  userInfo.setUserInfo({ name, description });
}

export function addFormHandler(event, values) {
  event.preventDefault();

  const popupSaveBtn = event.target.querySelector('.popup__save');
  const { place, link } = values;
  const card = renderCard(link, place)

  cardSection.addItem(card.generateCard());
  popupSaveBtn.classList.add('popup__save_disabled');
  popupSaveBtn.setAttribute('disabled', true);
}

export function renderCard(link, place) {
  const newCard = new Card(
    cardTemplate,
    { imageURI: link, title: place },
    () => popupWithImage.open(link, place)
  );

  return newCard;
}