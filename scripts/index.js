import { initialCards } from './initial-cards.js';
import { Card } from './card.js';
import { FormValidator } from './validation.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const userName = content.querySelector('.profile__name');
const userDescription = content.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupInputName = popupEdit.querySelector('.popup__input_type_name');
const popupInputDescription = popupEdit.querySelector('.popup__input_type_description');
const editForm = popupEdit.querySelector('.popup__form_type_edit');
const editPopupBtn = popupEdit.querySelector('.popup__close');

const popupAdd = document.querySelector('.popup_type_add');
const placeName = popupAdd.querySelector('.popup__input_type_text');
const placeImageSrc = popupAdd.querySelector('.popup__input_type_link');
const closeAddPopupBtn = popupAdd.querySelector('.popup__close');
const addForm = popupAdd.querySelector('.popup__form');
const submitBtn = popupAdd.querySelector('.popup__save');

export const popupImage = document.querySelector('.popup_type_image');
const imagePopupBtn = popupImage.querySelector('.popup__close');
const frame = popupImage.querySelector('.popup__image')
const caption = popupImage.querySelector('.popup__caption')

const cardsWrapper = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card-template').content;

const formSelector = document.querySelector('.popup__form_type_add');
const formSelectorTwo = document.querySelector('.popup__form_type_edit');

const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, formSelector);

const formValidatorTwo = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, formSelectorTwo);

function setProfileInfo(event) {
    event.preventDefault();

    userName.textContent = popupInputName.value;
    userDescription.textContent = popupInputDescription.value;

    closePopup(popupEdit);
}

function getProfileInfo() {
    popupInputName.value = userName.textContent;
    popupInputDescription.value = userDescription.textContent;
}

export function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    document.addEventListener('keydown', escapeHandler);
}

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeHandler);
}

function setImagePopupInfo(src, name) {
    frame.src = src;
    caption.textContent = name;
}

function closePopupByOverlay(popups) {
    popups.forEach(popup => {
        popup.addEventListener('click', function(event) {
            if (event.target === event.currentTarget) {
                closePopup(popup);
            }
        })
    })
}

function escapeHandler (event) {
    if (event.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
}

function addCardHandler(event) {
    event.preventDefault();

    const newCard = new Card(cardTemplate, placeImageSrc.value, placeName.value);
    
    renderCard(newCard.generateCard());
    closePopup(popupAdd);

    addForm.reset();
    submitBtn.classList.add('popup__save_disabled');
    submitBtn.setAttribute('disabled', 'true');
}

function renderCard(card) {
    cardsWrapper.prepend(card);
}

function renderAllCards() {
    initialCards.reverse().forEach((card) => {
        const newCard = new Card(cardTemplate,card.link, card.name);
        renderCard(newCard.generateCard());
    });
}

editButton.addEventListener('click', () => {
    getProfileInfo();
    openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
});

closeAddPopupBtn.addEventListener('click', () => {
    closePopup(popupAdd);
});

editPopupBtn.addEventListener('click', () => {
    closePopup(popupEdit);
});

imagePopupBtn.addEventListener('click', () => {
    closePopup(popupImage);
});

editForm.addEventListener('submit', setProfileInfo);

addForm.addEventListener('submit', addCardHandler);

renderAllCards();

closePopupByOverlay(popups);

formValidator.enableValidation();

formValidatorTwo.enableValidation();