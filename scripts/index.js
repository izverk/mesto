// ----------ПЕРЕМЕННЫЕ----------

// Исходный массив с данными карточек
import initialCards from './data.js';

// Класс карточек
import { Card } from './Card.js';

// Класс валидаторов форм ввода данных и объект его настроек
import { FormValidator, validationConfig } from './FormValidator.js';

// Объекты профиля пользователя
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Массив всех имеющихся попапов
const popups = Array.from(document.querySelectorAll('.popup'));

// Объекты попапа просмотра фотографии
  const photoPopup = document.querySelector('.popup_type_image');
  const photoPopupImage = photoPopup.querySelector('.popup__image');
  const photoPopupCaption = photoPopup.querySelector('.popup__caption');

// Объекты попапа редактирования профиля пользователя
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupOpenBtn = document.querySelector('.profile__edit-button');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const userNameInput = profilePopup.querySelector('.popup__input_type_name');
const userJobInput = profilePopup.querySelector('.popup__input_type_job');

// Объекты попапа добавления новой карточки в галерею
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupOpenBtn = document.querySelector('.profile__add-button');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const placeNameInput = cardPopup.querySelector('.popup__input_type_placename');
const imageLinkInput = cardPopup.querySelector('.popup__input_type_imagelink');

// Контейнер для добавления новых карточек
const cardsContainer = document.querySelector('.gallery__list');

// ----------ФУНКЦИИ----------

// Добавление новой карточки из формы ввода
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const newPlace = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
    description: `Фотография места. ${placeNameInput.value}`,
  };
  createAndAddCardToGallery(newPlace);
  closePopup(cardPopup);
}

// Создание карточки
function createCard(newPlace) {
  const card = new Card(newPlace, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание и добавление карточки на страницу
function createAndAddCardToGallery(newPlace) {
  const cardElement = createCard(newPlace);
  cardsContainer.prepend(cardElement);
}

// Открытие попапа и установка слушателей для закрытия по клику на оверлей или нажатию Esc
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', сlosePopupByEscape);
}

// Открытие попапа просмотра фотографии
function openPhoto(name, link, alt) {
  photoPopupCaption.textContent = name;
  photoPopupImage.src = link;
  photoPopupImage.alt = alt;
  openPopup(photoPopup);
}

// Открытие попапа редактирования профиля пользователя
function openProfilePopup() {
  clearForm(profilePopup);
  userNameInput.value = document.querySelector('.profile__name').textContent;
  userJobInput.value = document.querySelector('.profile__job').textContent;
  openPopup(profilePopup);
}

// Открытие попапа добавления карточки
function opencardPopup() {
  clearForm(cardPopup);
  openPopup(cardPopup);
}

// Сброс (очистка) формы ввода (значений инпутов, сообщений об ошибке, состояния кнопки)
function clearForm(currentPopup) {
  const form = currentPopup.querySelector('.popup__form');
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = currentPopup.querySelector('.popup__save-button');
  form.reset();
  inputs.forEach(input => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__input_state_invalid');
    error.classList.remove('popup__input-error_active');
    error.textContent = '';
  });
  submitButton.classList.add('popup__save-button_inactive');
  submitButton.setAttribute('disabled', true);
}

// Добавление нового профиля пользователя (перезапись полей профиля и закрытие попапа)
function saveProfileSubmitHandler() {
  profileName.textContent = userNameInput.value;
  profileJob.textContent = userJobInput.value;
  closePopup(profilePopup);
}

// Закрытие попапа
function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', сlosePopupByEscape);
}

// Закрытие попапа нажатием Esc
function сlosePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

// ----------ДЕЙСТВИЯ----------

// Заполняем галерею карточками при загрузке страницы
initialCards.forEach(item => {
  createAndAddCardToGallery(item);
});

// Создаем для каждой формы ввода свой объект валидатора при загрузке страницы
const forms = Array.from(document.querySelectorAll('.popup__form'));
forms.forEach(formElement => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

// Отслеживаем события попапа редактирования профиля
profilePopupOpenBtn.addEventListener('click', openProfilePopup);
profilePopupForm.addEventListener('submit', saveProfileSubmitHandler);

// Отслеживаем события попапа добавления новой карточки
cardPopupOpenBtn.addEventListener('click', () => opencardPopup(cardPopup));
cardPopupForm.addEventListener('submit', addCardSubmitHandler);

// Отслеживаем закрытие всех попапов (по клику на оверлей, по клику на крестик)
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

export { openPhoto };
