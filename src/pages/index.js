import { 
    btnEdit, 
    btnAdd, 
    initialCards,
    validatorSelectors, 
    formSelector, 
    formSelectorTwo 
} from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { editFormHandler, addFormHandler, setInputValues, renderCard } from '../utils/functions.js'
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';

import './index.css';

export const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
});

export const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithEditForm = new PopupWithForm('.popup_type_edit', editFormHandler);
const popupWithAddForm = new PopupWithForm('.popup_type_add', addFormHandler);

const formValidator = new FormValidator(validatorSelectors, formSelector);
const formValidatorTwo = new FormValidator(validatorSelectors, formSelectorTwo);

export const cardSection = new Section({
    items: initialCards,
    renderer: function(item) {
        const card = renderCard(item.link, item.name);
        return card.generateCard();
    }
}, '.cards');

popupWithImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();

cardSection.render();

formValidator.enableValidation();
formValidatorTwo.enableValidation();

btnEdit.addEventListener('click', () => { 
    popupWithEditForm.open();
    setInputValues(userInfo);
});

btnAdd.addEventListener('click', (e) => { 
    popupWithAddForm.open(e); 
});