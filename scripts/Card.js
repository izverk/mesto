// Функция открытия попапа просмотра фотографии
// import { openPhoto } from './index.js';
let cardsTest;
// Класс "Карточка"
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._description = `Фотография места. ${data.name}`;
    this._cardSelector = cardSelector;
    this._cardElement = {};
    this._cardNameElement = document
      .querySelector(cardSelector)
      .content.querySelector('.card__name');
    this._cardPhotoElement = document
      .querySelector(cardSelector)
      .content.querySelector('.card__photo');
    this._cardLikeElement = document
      .querySelector(cardSelector)
      .content.querySelector('.card__like');
    this._cardDelButtonElement = document
      .querySelector(cardSelector)
      .content.querySelector('.card__delete');
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
    this._cardNameElement.textContent = this._name;
    this._cardPhotoElement.setAttribute('src', this._link);
    this._cardPhotoElement.setAttribute('alt', this._description);
    this._setEventListeners();
    return this._cardElement;
  }
  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._cardLikeElement.addEventListener('click', () => {
      this._likeToggle();
    });
    this._cardDelButtonElement.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardPhotoElement.addEventListener('click', () =>
      openPhoto(this._name, this._link, this._description)
    );
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

export { Card };
