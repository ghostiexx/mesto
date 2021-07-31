import { userInfo, cardTemplate, popupWithImage, cardSection } from "./constants.js";
import { Card } from '../Сard.js';

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

  const { place, link } = values;

  const card = new Card(
      cardTemplate,
      { imageURI: link, title: place },
      (e) => popupWithImage.open(e)
  );

  cardSection.addItem(card.generateCard());
}