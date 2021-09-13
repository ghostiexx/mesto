import { 
    btnEdit, 
    btnAdd, 
    btnEditAvatar,
    validatorSelectors, 
    formSelector, 
    formSelectorTwo,
    formSelectorThree,
    userId
} from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { 
    editFormHandler, 
    addFormHandler, 
    updateAvatarHandler, 
    setInputValues, 
    renderCard 
} from '../utils/functions.js'
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';

import './index.css';

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

export const popupWithImage = new PopupWithImage('.popup_type_image');
export const popupWithEditForm = new PopupWithForm('.popup_type_edit', editFormHandler);
export const popupWithAddForm = new PopupWithForm('.popup_type_add', addFormHandler);
export const updateAvatarPopup = new PopupWithForm('.popup_type_update', updateAvatarHandler);
export const confirmDeletePopup = new PopupConfirm('.popup_type_confirm');

const formValidator = new FormValidator(validatorSelectors, formSelector);
const formValidatorTwo = new FormValidator(validatorSelectors, formSelectorTwo);
const formValidatorThree = new FormValidator(validatorSelectors, formSelectorThree);

const renderInitialCards = (cards) => {
    const cardSection = new Section({
        items: cards,
        renderer: (item) => {
            const card = renderCard(item.link, item.name, item._id, item.owner._id, userId, item.likes);
            return card.generateCard();
        }
    }, '.cards')

    cardSection.render();
};

api.getInitialCards().then((cards) => {
    renderInitialCards(cards);
});

api.getUserInfo()
    .then((info) => {
        userInfo.setUserInfo({
            name: info.name,
            description: info.about
        });
        userInfo.setUserAvatar(info.avatar);
    });

popupWithImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
updateAvatarPopup.setEventListeners();
confirmDeletePopup.setEventListeners();

formValidator.enableValidation();
formValidatorTwo.enableValidation();
formValidatorThree.enableValidation();

btnEdit.addEventListener('click', () => { 
    popupWithEditForm.open();
    setInputValues(userInfo);
});

btnAdd.addEventListener('click', (e) => { 
    popupWithAddForm.open(e); 
});

btnEditAvatar.addEventListener('click', () => {
    updateAvatarPopup.open();
});