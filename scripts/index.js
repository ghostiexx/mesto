import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
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
const content = document.querySelector('.content');
const btnEdit = content.querySelector('.profile__edit-button');
const btnAdd = content.querySelector('.profile__add-button');
const userName = content.querySelector('.profile__name');
const userDescription = content.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupInputName = popupEdit.querySelector('.popup__input_type_name');
const popupInputDescription = popupEdit.querySelector('.popup__input_type_description');
const formEdit = popupEdit.querySelector('.popup__form_type_edit');
const btnEditPopup = popupEdit.querySelector('.popup__close');

const popupAdd = document.querySelector('.popup_type_add');
const placeName = popupAdd.querySelector('.popup__input_type_text');
const placeImageSrc = popupAdd.querySelector('.popup__input_type_link');
const btnCloseAddPopup = popupAdd.querySelector('.popup__close');
const formAdd = popupAdd.querySelector('.popup__form');
const btnSubmit = popupAdd.querySelector('.popup__save');

export const popupImage = document.querySelector('.popup_type_image');
const btnImagePopup = popupImage.querySelector('.popup__close');
const frame = popupImage.querySelector('.popup__image')
const caption = popupImage.querySelector('.popup__caption')

const cardsWrapper = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card-template').content;

const validatorSelectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
const formSelector = document.querySelector('.popup__form_type_add');
const formSelectorTwo = document.querySelector('.popup__form_type_edit');

const formValidator = new FormValidator(validatorSelectors, formSelector);

const formValidatorTwo = new FormValidator(validatorSelectors, formSelectorTwo);

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

    const newCard = new Card(cardTemplate, {
        imageURI: placeImageSrc.value, 
        title: placeName.value
    });
    
    renderCard(newCard.generateCard());
    closePopup(popupAdd);

    formAdd.reset();
    btnSubmit.classList.add('popup__save_disabled');
    btnSubmit.setAttribute('disabled', 'true');
}

function renderCard(card) {
    cardsWrapper.prepend(card);
}

function renderAllCards() {
    initialCards.reverse().forEach((card) => {
        const newCard = new Card(cardTemplate, {
            imageURI: card.link, title: card.name
        });
        renderCard(newCard.generateCard());
    });
}

btnEdit.addEventListener('click', () => {
    getProfileInfo();
    openPopup(popupEdit);
});

btnAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});

btnCloseAddPopup.addEventListener('click', () => {
    closePopup(popupAdd);
});

btnEditPopup.addEventListener('click', () => {
    closePopup(popupEdit);
});

btnImagePopup.addEventListener('click', () => {
    closePopup(popupImage);
});

formEdit.addEventListener('submit', setProfileInfo);

formAdd.addEventListener('submit', addCardHandler);

renderAllCards();

closePopupByOverlay(popups);

formValidator.enableValidation();

formValidatorTwo.enableValidation();