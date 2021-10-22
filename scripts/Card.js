class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._description = `Фотография места. ${data.name}`;
    this._cardSelector = cardSelector;
  }
  // Получение шаблона разметки для новой карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardTemplate;
  }
  // Наполнение данными шаблона разметки карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__photo').setAttribute('src', this._link);
    this._element.querySelector('.card__photo').setAttribute('alt', this._description);
    return this._element;
  }
  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeToggle();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element
      .querySelector('.card__photo')
      .addEventListener('click', () =>
        openPhoto(newCardName.textContent, newCardPhoto.src, newCardPhoto.alt)
      );
  }
  // Переключение лайка в карточке
  _likeToggle(evt) {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
  // Удаление карточки
  _deleteCard() {
    this._element.remove();
  }
}

// function deleteCard(evt) {
//
// }
export { Card };
