import { UserInfo } from '../UserInfo.js';
import { PopupWithImage } from '../PopupWithImage.js';
import { PopupWithForm } from '../PopupWithForm.js';
import { editFormHandler, addFormHandler } from './functions.js'
import { Section } from '../Section.js';
import { FormValidator } from '../FormValidator.js';
import { Card } from '../Сard.js';

export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validatorSelectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
});

export const btnEdit = document.querySelector('.profile__edit-button');
export const btnAdd = document.querySelector('.profile__add-button');
export const cardTemplate = document.querySelector('#card-template').content;
export const formSelector = document.querySelector('.popup__form_type_add');
export const formSelectorTwo = document.querySelector('.popup__form_type_edit');

export const popupWithImage = new PopupWithImage('.popup_type_image');
export const popupWithEditForm = new PopupWithForm('.popup_type_edit', editFormHandler);
export const popupWithAddForm = new PopupWithForm('.popup_type_add', addFormHandler);

export const formValidator = new FormValidator(validatorSelectors, formSelector);
export const formValidatorTwo = new FormValidator(validatorSelectors, formSelectorTwo);

export const cardSection = new Section({
    items: initialCards,
    renderer: function(item) {
        const card = new Card(
            cardTemplate,
            { imageURI: item.link, title: item.name },
            (e) => popupWithImage.open(e)
        );
        
        return card.generateCard();
    }
}, '.cards');