// Выбираем попап редактирования профиля пользователя и кнопки его открытия/закрытия
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupOpenBtn = document.querySelector('.profile__edit-button');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-button');
// Выбираем форму редактирования профиля и её поля ввода данных
let profilePopupForm = profilePopup.querySelector('.popup__form');
let userNameInput = profilePopup.querySelector('.popup__input_type_name');
let userJobInput = profilePopup.querySelector('.popup__input_type_job');
// Выбираем попап добавления новой карточки в галерею и кнопки его открытия/закрытия
const addCardPopup = document.querySelector('.popup_type_card');
const addCardPopupOpenBtn = document.querySelector('.profile__add-button');
const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-button');
// Выбираем форму добавления новой карточки и её поля ввода данных
let addCardPopupForm = addCardPopup.querySelector('.popup__form');
let placeNameInput = addCardPopup.querySelector('.popup__input_type_placename');
let imageLinkInput = addCardPopup.querySelector('.popup__input_type_imagelink');
// Выбираем контейнер галереи для дальнейшей вставки в него карточек
const galleryList = document.querySelector('.gallery__list');
// Выбираем шаблон для создания карточки
const cardTemplate = document.querySelector('.card-template');
// Определяем массив карточек с их именами и путями к картинкам
// для первоначального заполнения галереи при загрузке страницы
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

// Добавление карточки в галерею
function createCard(initialCards) {
  const newCard = cardTemplate.content.cloneNode(true);// клонирование шаблона
  newCard.querySelector('.card__name').textContent = initialCards.name;// установка заголовка карточки
  newCard.querySelector('.card__photo').setAttribute('src', initialCards.link);// установка пути к картинке карточки
  newCard.querySelector('.card__like').addEventListener('click', likeToggle);// установка слушателя для кнопки Лайк
  newCard.querySelector('.card__delete').addEventListener('click', deleteCard);// установка слушателя для кнопки Удалить
  galleryList.prepend(newCard);
}
// Открытие попапа (любого)
function popupOpen(popupType) {
  popupType.classList.add('popup_opened');
  if (popupType === profilePopup) {
    userNameInput.value = document.querySelector('.profile__name').textContent;
    userJobInput.value = document.querySelector('.profile__job').textContent;
  }
}
// Закрытие попапа (любого)
function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}
// Обработка нажатия кнопки Сохранение в форме редактирования профиля
// (перезапись полей профиля и закрытие попапа)
function profileSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  document.querySelector('.profile__name').textContent = userNameInput.value;
  document.querySelector('.profile__job').textContent = userJobInput.value;
  popupClose(profilePopup);
}
// Обработка нажатия кнопки Сохранение в форме добавления карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  let newPlace = {
    name: placeNameInput.value,
    link: imageLinkInput.value
  };
  initialCards.splice(0, initialCards.length, newPlace);// обновление массива карточек данными из формы
  initialCards.forEach(createCard);
  placeNameInput.value = '';
  imageLinkInput.value = '';
  popupClose(addCardPopup);
}
// Переключение лайка в карточке
function likeToggle(evt) {
  evt.currentTarget.classList.toggle('card__like_active')
};
// Удаление карточки
function deleteCard(evt) {
  const deletedCard = evt.currentTarget.closest('.card');
  deletedCard.remove();
};

// Заполняем галерею карточками
initialCards.forEach(createCard);
// Отслеживаем клики на кнопках открытия/закрытия формы редактирования профиля
profilePopupOpenBtn.addEventListener('click', () => popupOpen(profilePopup));
profilePopupCloseBtn.addEventListener('click', () => popupClose(profilePopup));
// Отслеживаем клик на кнопке Сохранить в форме редактирования профиля
profilePopupForm.addEventListener('submit', profileSubmitHandler);
// Отслеживаем клики на кнопках открытия/закрытия формы добавления новой карточки
addCardPopupOpenBtn.addEventListener('click', () => popupOpen(addCardPopup));
addCardPopupCloseBtn.addEventListener('click', () => popupClose(addCardPopup));
// Отслеживаем клик на кнопке Сохранить в форме добавления карточки
addCardPopupForm.addEventListener('submit', addCardSubmitHandler);
