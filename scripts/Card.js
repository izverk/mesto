
class Card {
  constructor(initialCard) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._description = `Фотография места. ${initialCard.name}`;
    // this._isLiked = false;
  }
  // _like() {
  //   this._isLiked = !this._isLiked;
  // }
  // Получение разметки для новой карточки
  _getTemplate() {
    const cardTemplate = document.querySelector('.card-template').content.cloneNode(true);
    return cardTemplate;
  }
  // Наполнение данными шаблона разметки карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__photo').setAttribute('src', this._link);
    this._element.querySelector('.card__photo').setAttribute('alt', this._description);
    return this._element;
  }

  // Создание карточки (подготовка разметки, установка слушателей)
  // function createCard(initialCard) {
  //   const newCard = cardTemplate.content.cloneNode(true);
  //   const newCardName = newCard.querySelector(".card__name");
  //   const newCardPhoto = newCard.querySelector(".card__photo");
  //   const newCardLike = newCard.querySelector(".card__like");
  //   const newCardDeleteBtn = newCard.querySelector(".card__delete");
  //   newCardName.textContent = initialCard.name;
  //   newCardPhoto.setAttribute("src", initialCard.link);
  //   newCardPhoto.setAttribute("alt", initialCard.description);

  //   newCardPhoto.addEventListener("click", () => openPhoto(newCardName.textContent, newCardPhoto.src, newCardPhoto.alt));
  //   newCardLike.addEventListener("click", likeToggle);
  //   newCardDeleteBtn.addEventListener("click", deleteCard);
  //   return newCard;
  // }

  // // Добавление карточки в галерею
  // function addCardToGallery(card) {
  //   gallery.prepend(card);
  // }

  // // Создание и добавление карточки в галерею
  // function createAndAddCardToGallery(initialCard) {
  //   const newCard = createCard(initialCard);
  //   addCardToGallery(newCard);
  // }
}
export { Card };
