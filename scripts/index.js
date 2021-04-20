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

const popupImage = document.querySelector('.popup_type_image');
const imagePopupBtn = popupImage.querySelector('.popup__close');
const frame = popupImage.querySelector('.popup__image')
const caption = popupImage.querySelector('.popup__caption')

const cardsWrapper = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card-template').content;

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

function openPopup(popupName) {
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

function createCard(src, text) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-btn');
    const likeBtn = cardElement.querySelector('.card__button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__name');

    cardImage.src = src;
    cardImage.alt = `Изображение ${text}`
    cardName.textContent = text;

    deleteButton.addEventListener('click', () => {
        const cardItem = deleteButton.closest('.card');
        cardItem.remove();
    });

    likeBtn.addEventListener('click', (event) => {
        const eventTarget = event.target;
        eventTarget.classList.toggle('card__button_active');
    });

    cardImage.addEventListener('click', () => {
        setImagePopupInfo(cardImage.src, cardName.textContent);
        openPopup(popupImage);
    });

    return cardElement;
}

function renderCard(card) {
    cardsWrapper.prepend(card);
}

function renderAllCards() {
    initialCards.reverse().forEach((card) => {
        renderCard(createCard(card.link, card.name));
    });
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

    renderCard(createCard(placeImageSrc.value, placeName.value));
    closePopup(popupAdd);

    addForm.reset();
    submitBtn.classList.add('popup__save_disabled');
    submitBtn.setAttribute('disabled', 'true');
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