// Класс карточек
export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDelButtonClick }, cardSelector) {
    this._cardData = data;
    this._name = data.name;
    this._link = data.link;
    this._description = `Фотография места. ${data.name}`;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._bindedHandleLikeClick = this._handleLikeClick.bind(this);
    this._handleDelButtonClick = handleDelButtonClick;
    this._isLiked = this._cardData.
  }
  // Получение шаблона разметки для новой карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  // Наполнение данными шаблона разметки карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardNameElement = this._cardElement.querySelector('.card__name');
    this._cardPhotoElement = this._cardElement.querySelector('.card__photo');
    this._cardLikeElement = this._cardElement.querySelector('.card__like');
    this._cardLikeNumberElement = this._cardElement.querySelector('.card__like-number');
    this._cardDelButtonElement = this._cardElement.querySelector('.card__delete');
    this._setEventListeners();
    this._cardNameElement.textContent = this._name;
    this._cardPhotoElement.setAttribute('src', this._link);
    this._cardPhotoElement.setAttribute('alt', this._description);
    this._cardLikeNumberElement.textContent = this._cardData.likes.length;
    return this._cardElement;
  }
  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._cardLikeElement.addEventListener('click', () => {
      this._bindedHandleLikeClick();
      this._likeToggle();
    });
    this._cardDelButtonElement.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardPhotoElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }
  // Переключение лайка в карточке
  _likeToggle() {
    this._cardLikeElement.classList.toggle('card__like_active');
  }
  // Удаление карточки
  _deleteCard() {
    this._cardElement.remove();
  }
}
