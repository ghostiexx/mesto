let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let userName = content.querySelector('.profile__name');
let userDescription = content.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputDescription = popup.querySelector('.popup__input_type_description');
let popupForm = popup.querySelector('.popup__form');

function setProfileInfo(event) {
    event.preventDefault();
    userName.textContent = popupInputName.value;
    userDescription.textContent = popupInputDescription.value;
    closePopup();
}

function openPopup() {
    popupInputName.value = userName.textContent;
    popupInputDescription.value = userDescription.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup)

closePopupButton.addEventListener('click', closePopup)

popupForm.addEventListener('submit', setProfileInfo);