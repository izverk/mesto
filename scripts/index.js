// ----------ПЕРЕМЕННЫЕ----------

// Объекты профиля пользователя
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Объекты попапа редактирования профиля пользователя
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-button");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const userNameInput = profilePopup.querySelector(".popup__input_type_name");
const userJobInput = profilePopup.querySelector(".popup__input_type_job");

// Объекты попапа добавления новой карточки в галерею
const cardPopup = document.querySelector(".popup_type_card");
const cardPopupOpenBtn = document.querySelector(".profile__add-button");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close-button");
const cardPopupForm = cardPopup.querySelector(".popup__form");
const placeNameInput = cardPopup.querySelector(".popup__input_type_placename");
const imageLinkInput = cardPopup.querySelector(".popup__input_type_imagelink");

// Галерея (контейнер для добавления карточек)
const gallery = document.querySelector(".gallery__list");

// Объекты попапа просмотра фотографии
const photoPopup = document.querySelector(".popup_type_image");
const photoPopupCloseBtn = photoPopup.querySelector(".popup__close-button");
const photoPopupImage = photoPopup.querySelector(".popup__image");
const photoPopupCaption = photoPopup.querySelector(".popup__caption");

// Шаблон карточки
const cardTemplate = document.querySelector(".card-template");


// ----------ФУНКЦИИ----------

// Создание карточки (подготовка разметки, установка слушателей)
function createCard(initialCard) {
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardName = newCard.querySelector(".card__name");
  const newCardPhoto = newCard.querySelector(".card__photo");
  const newCardLike = newCard.querySelector(".card__like");
  const newCardDeleteBtn = newCard.querySelector(".card__delete");
  newCardName.textContent = initialCard.name;
  newCardPhoto.setAttribute("src", initialCard.link);
  newCardPhoto.setAttribute("alt", initialCard.description);
  newCardPhoto.addEventListener("click", () => openPhoto(newCardName.textContent, newCardPhoto.src, newCardPhoto.alt));
  newCardLike.addEventListener("click", likeToggle);
  newCardDeleteBtn.addEventListener("click", deleteCard);
  return newCard;
}

// Добавление карточки в галерею
function addCardToGallery(card) {
  gallery.prepend(card);
}

// Создание и добавление карточки в галерею
function createAndAddCardToGallery(initialCard) {
  const newCard = createCard(initialCard);
  addCardToGallery(newCard);
}

// Добавление новой карточки места из формы ввода
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

// Открытие попапа и установка слушателей для закрытия по клику на оверлей или нажатию Esc
function openPopup(popupType) {
  // checkOpenedForm(popupType);
  popupType.classList.add("popup_opened");
  popupType.addEventListener("mousedown", сlosePopupByMouse);
  document.addEventListener("keydown", сlosePopupByEscape);
}

// Открытие попапа редактирования профиля пользователя
function openProfilePopup() {
  userNameInput.value = document.querySelector(".profile__name").textContent;
  userJobInput.value = document.querySelector(".profile__job").textContent;
  openPopup(profilePopup);
}

// Добавление нового профиля пользователя (перезапись полей профиля и закрытие попапа)
function saveProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileJob.textContent = userJobInput.value;
  closePopup(profilePopup);
}

// Открытие фотографии для просмотра
function openPhoto(name, link, alt) {
  photoPopupCaption.textContent = name;
  photoPopupImage.src = link;
  photoPopupImage.alt = alt;
  openPopup(photoPopup);
}

// Закрытие попапа
function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  currentPopup.removeEventListener("mousedown", сlosePopupByMouse);
  document.removeEventListener("keydown", сlosePopupByEscape);
  if (!isPhotoPopup(currentPopup)) {
    clearForm(currentPopup);
  }
}

// Проверка является ли закрываемый попап Фотопопапом (в котором нет формы ввода данных)
function isPhotoPopup(currentPopup) {
  return currentPopup.classList.contains("popup_type_image");
}

// Сброс формы ввода (значений инпутов, сообщений об ошибке, состояния кнопки)
function clearForm(currentPopup) {
  const form = currentPopup.querySelector(".popup__form");
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const inputErrorList = inputList.map((input) => {
    return form.querySelector(`.${input.id}-error`);
  });
  const submitButton = form.querySelector(".popup__save-button");
  form.reset();
  resetInputsClass(inputList);
  resetErrorMessages(inputErrorList);
  resetSubmitButton(submitButton);
}

// Сброс стилей невалидных инпутов
function resetInputsClass(inputList) {
  inputList.forEach((input) => {
    input.classList.remove("popup__input_type_error");
  });
}

// Сброс сообщений об ошибках ввода
function resetErrorMessages(inputErrorList) {
  inputErrorList.forEach((inputError) => {
    inputError.textContent = "";
  });
}

// Сброс состояния кнопки отправки формы
function resetSubmitButton(submitButton) {
  submitButton.classList.remove("popup__save-button_inactive");
  submitButton.removeAttribute("disabled");
}

// Закрытие попапа кликом на оверлей
function сlosePopupByMouse(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

// Закрытие попапа нажатием Esc
function сlosePopupByEscape(evt) {
  const key = evt.keyCode;
  const currentPopup = document.querySelector(".popup_opened");
  if (key === 27) {
    closePopup(currentPopup);
  }
}

// Переключение лайка в карточке
function likeToggle(evt) {
  evt.currentTarget.classList.toggle("card__like_active");
}

// Удаление карточки
function deleteCard(evt) {
  const deletedCard = evt.currentTarget.closest(".card");
  deletedCard.remove();
}

// ----------ДЕЙСТВИЯ----------

// Заполняем галерею карточками при загрузке страницы
initialCards.forEach(createAndAddCardToGallery);

// Отслеживаем события попапа редактирования профиля
profilePopupOpenBtn.addEventListener("click", openProfilePopup);
profilePopupCloseBtn.addEventListener("click", () => closePopup(profilePopup));
profilePopupForm.addEventListener("submit", saveProfileSubmitHandler);

// Отслеживаем события попапа добавления новой карточки
cardPopupOpenBtn.addEventListener("click", () => openPopup(cardPopup));
cardPopupCloseBtn.addEventListener("click", () => closePopup(cardPopup));
cardPopupForm.addEventListener("submit", addCardSubmitHandler);

// Отслеживаем закрытие попапа просмотра фотографии (отслеживание открытия
// попапа устанавливается в функциях создания карточки)
photoPopupCloseBtn.addEventListener("click", () => closePopup(photoPopup));
