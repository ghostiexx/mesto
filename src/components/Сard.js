export class Card {
  constructor(template, params, cardId, ownerId, currentUserId, likesAmount, { handleCardClick, deleteCardHandler, setLikeHandler, deleteLikeHandler }) {
    this._cardTemplate = template;
    this._title = params.title;
    this._imageURI = params.imageURI;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._currentUserId = currentUserId;
    this._likesAmount = likesAmount;

    this._handleCardClick = handleCardClick;
    this._deleteCardHandler = deleteCardHandler;
    this._setLikeHandler = setLikeHandler;
    this._deleteLikeHandler = deleteLikeHandler;
  }

  _getCardFromTemplate() {
    this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
    this._likeButton = this._cardElement.querySelector('.card__button');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__name');
    this._cardLikes = this._cardElement.querySelector('.card__like-counter');

    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.classList.add('card__delete-btn_disabled');
      this._deleteButton.setAttribute('disabled', true);
    }
  }

  _setCardInfo() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._imageURI;
    this._cardImage.alt = `Изображение ${this._title}`;
  }

  _setLikesAmount() {
    this._cardLikes.textContent = this._likesAmount.length;
  }

  _isLikedByUser() {
    this._likesAmount.forEach((liker) => {
      if (liker._id === this._currentUserId) {
        this._likeButton.classList.add('card__button_active');
      }
    })
  }

  renderLikesAmount(likes) {
    return String(likes);
  }

  setLike(likes) {
    this._likeButton.classList.add('card__button_active');
    this._cardLikes.textContent = this.renderLikesAmount(likes);
  }

  deleteLike(likes) {
    this._likeButton.classList.remove('card__button_active');
    this._cardLikes.textContent = this.renderLikesAmount(likes);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardHandler();
    });

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__button_active')) {
        this._deleteLikeHandler();
      } else {
        this._setLikeHandler();
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  getCardId() {
    return this._cardId;
  }

  generateCard() {
    this._getCardFromTemplate();
    this._setCardInfo();
    this._setEventListeners();
    this._setLikesAmount();
    this._isLikedByUser();

    return this._cardElement;
  }
}