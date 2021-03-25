let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let name = content.querySelector('.profile__name');
let description = content.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputDescription = popup.querySelector('.popup__input_type_description');
let savePopupButton = popup.querySelector('.popup__save');

let imageCard = document.querySelectorAll('.card');
let likeButton = [];


for (let i = 0; i < imageCard.length; i++) {
    likeButton[i] = imageCard[i].querySelector('.card__button');
}

for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', function () {
        if (likeButton[i].classList.contains('card__button_active')) {
            likeButton[i].classList.remove('card__button_active');
        } else {
            likeButton[i].classList.add('card__button_active');
        }
    })
}

function setInputValue() {
    popupInputName.value = name.textContent;
    popupInputDescription.value = description.textContent;
}

function setProfileInfo() {
    name.textContent = popupInputName.value;
    description.textContent = popupInputDescription.value;
}

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
    setInputValue();
    openPopup();
})

closePopupButton.addEventListener('click', function() {
    closePopup();
})

savePopupButton.addEventListener('click', function(event) {
    event.preventDefault();

    setProfileInfo();
    closePopup();
});