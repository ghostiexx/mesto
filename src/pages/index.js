import './index.css';

import {
    btnEdit,
    btnAdd,
    btnEditAvatar,
    validatorSelectors,
    addFormSelector,
    editFormSelector,
    updateFormSelector,
    cardsContainer,
    cardTemplate,
    nameFiled,
    descriptionFiled
} from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import { Card } from "../components/Сard";

let userId;

export const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar-image '
});

export const api =  new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: 'd1fb4f5d-7dcb-41a7-a4a6-36843c6f0f6c',
        'Content-Type': 'application/json'
    }
});

function setInputValues(userInfo) {
    const { name, description } = userInfo.getUserInfo();

    nameFiled.value = name;
    descriptionFiled.value = description;
}

function editFormHandler(event, values) {
    event.preventDefault();

    const { name, description } = values;

    popupWithEditForm.setButtonTextContent();
    api.editProfile(name, description)
        .then(function() {
            userInfo.setUserInfo({ name, description });
            popupWithEditForm.close();
        })
        .catch(error => alert(`Ошибка: ${error}`))
        .finally(() => {
            popupWithEditForm.setButtonTextContent('Сохранить');
        })
}

const cardSection = new Section({
    renderer: (item) => {
        const card = renderCard(item.link, item.name, item._id, item.owner._id, userId, item.likes);
        return card.generateCard();
    }
}, '.cards');

function addFormHandler(event, values) {
    event.preventDefault();

    const popupSaveBtn = event.target.querySelector('.popup__save');
    const { place, link } = values;

    popupWithAddForm.setButtonTextContent();
    api.addCard(place, link)
        .then(response => {
            const card = renderCard(link, place, response._id, response.owner._id, userId, response.likes);
            cardSection.addItem(card.generateCard());
            popupWithAddForm.close();
        })
        .catch(error => alert(`Ошибка: ${error}`))
        .finally(() => {
            popupWithAddForm.setButtonTextContent('Сохранить');

            popupSaveBtn.classList.add('popup__save_disabled');
            popupSaveBtn.setAttribute('disabled', true);
        })
}

function updateAvatarHandler(event, values) {
    event.preventDefault();

    const { newAvatar } = values;

    updateAvatarPopup.setButtonTextContent();
    api.updateAvatar(newAvatar)
        .then(response => {
            userInfo.setUserAvatar(response.avatar);
            updateAvatarPopup.close();
        })
        .catch(error => alert(`Ошибка: ${error}`))
        .finally(() => {
            updateAvatarPopup.setButtonTextContent('Сохранить');
        })
}

function renderCard(link, place, cardId, ownerId, currentUser, likesAmount) {
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
                            confirmDeletePopup.close();
                        })
                        .catch(error => alert(`Ошибка: ${error}`))
                        .finally(() => {
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

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithEditForm = new PopupWithForm('.popup_type_edit', editFormHandler);
const popupWithAddForm = new PopupWithForm('.popup_type_add', addFormHandler);
const updateAvatarPopup = new PopupWithForm('.popup_type_update', updateAvatarHandler);
const confirmDeletePopup = new PopupConfirm('.popup_type_confirm');

const addFormValidator = new FormValidator(validatorSelectors, addFormSelector);
const editFormValidator = new FormValidator(validatorSelectors, editFormSelector);
const updateFormValidator = new FormValidator(validatorSelectors, updateFormSelector);

popupWithImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
updateAvatarPopup.setEventListeners();
confirmDeletePopup.setEventListeners();

addFormValidator.enableValidation();
editFormValidator.enableValidation();
updateFormValidator.enableValidation();

btnEdit.addEventListener('click', () => {
    popupWithEditForm.open();
    setInputValues(userInfo);
    editFormValidator.resetValidation();
});

btnAdd.addEventListener('click', (e) => {
    popupWithAddForm.open(e);
    addFormValidator.resetValidation();
});

btnEditAvatar.addEventListener('click', () => {
    updateAvatarPopup.open();
    updateFormValidator.resetValidation();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({
            name: userData.name,
            description: userData.about,
        });
        userInfo.setUserAvatar(userData.avatar);
        userId = userData._id;

        cardSection.render(cards.reverse());

    })
    .catch(error => alert(`Ошибка: ${error}`))