// Выбираем попап редактирования профиля пользователя и кнопки его открытия/закрытия
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupOpenBtn = document.querySelector('.profile__edit-button');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-button');
// Выбираем форму редактирования профиля и её поля ввода данных
let profilePopupForm = profilePopup.querySelector('.popup__form');
let userNameInput = profilePopup.querySelector('.popup__input_type_name');
let userJobInput = profilePopup.querySelector('.popup__input_type_job');
// Выбираем попап добавления новой карточки в галерею
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
let initialCards = [
  {
    name: 'Елизово. Корякский вулкан',
    link: './images/koryaksky_volcano_elizovo.jpg'
  },
  {
    name: 'Калгари',
    link: './images/calgary_canada.jpg'
  },
  {
    name: 'Кейптаун',
    link: './images/cape_town_south_africa.jpg'
  },
  {
    name: 'Дубаи',
    link: './images/dubai_united_arab_emirates.jpg'
  },
  {
    name: 'Лагуна Бич',
    link: './images/laguna_beach_united_states.jpg'
  },
  {
    name: 'Гиза',
    link: './images/giza_egypt.jpg'
  }
];


// Добавление карточки в галерею
function createCard(initialCards) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__name').textContent = initialCards.name;
  newCard.querySelector('.card__photo').setAttribute('src', initialCards.link);
  galleryList.prepend(newCard);
}
// Открытие попапа
function popupOpen(popupType) {
  popupType.classList.add('popup_opened');
  if (popupType === profilePopup) {
    userNameInput.value = document.querySelector('.profile__name').textContent;
    userJobInput.value = document.querySelector('.profile__job').textContent;
  }
}
// Закрытие попапа
function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}
// Обработка нажатия кнопки Сохранение в форме редактирования профиля
// (перезапись полей профиля и закрытие попапа)
function profileFormSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  document.querySelector('.profile__name').textContent = userNameInput.value;
  document.querySelector('.profile__job').textContent = userJobInput.value;
  popupClose(profilePopup);
}
// Обработка нажатия кнопки Сохранение в форме добавления карточки
function addCardFormSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  let newPlace = {
    name: placeNameInput.value,
    link: imageLinkInput.value
  };
  initialCards.splice(0, 6, newPlace);
  initialCards.forEach(createCard);
  placeNameInput.value = '';
  imageLinkInput.value = '';
  popupClose(addCardPopup);
}


// Заполняем галерею карточками
initialCards.forEach(createCard);
// Отслеживаем клики на кнопках открытия/закрытия формы редактирования профиля
profilePopupOpenBtn.addEventListener('click', () => popupOpen(profilePopup));
profilePopupCloseBtn.addEventListener('click', () => popupClose(profilePopup));
// Отслеживаем клик на кнопке Сохранить в форме редактирования профиля
profilePopupForm.addEventListener('submit', profileFormSubmitHandler);
// Отслеживаем клики на кнопках открытия/закрытия формы добавления новой карточки
addCardPopupOpenBtn.addEventListener('click', () => popupOpen(addCardPopup));
addCardPopupCloseBtn.addEventListener('click', () => popupClose(addCardPopup));
// Отслеживаем клик на кнопке Сохранить в форме добавления карточки
addCardPopupForm.addEventListener('submit', addCardFormSubmitHandler);
