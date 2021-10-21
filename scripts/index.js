// ----------ПЕРЕМЕННЫЕ----------

// Объекты профиля пользователя
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Массив всех имеющихся попапов
const popups = Array.from(document.querySelectorAll(".popup"));

// Объекты попапа редактирования профиля пользователя
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const userNameInput = profilePopup.querySelector(".popup__input_type_name");
const userJobInput = profilePopup.querySelector(".popup__input_type_job");

// Объекты попапа добавления новой карточки в галерею
const cardPopup = document.querySelector(".popup_type_card");
const cardPopupOpenBtn = document.querySelector(".profile__add-button");
const cardPopupForm = cardPopup.querySelector(".popup__form");
const placeNameInput = cardPopup.querySelector(".popup__input_type_placename");
const imageLinkInput = cardPopup.querySelector(".popup__input_type_imagelink");

// Галерея (контейнер для добавления карточек)
const gallery = document.querySelector(".gallery__list");

// Объекты попапа просмотра фотографии
const photoPopup = document.querySelector(".popup_type_image");
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

// Открытие попапа и установка слушателей для закрытия по клику на оверлей или нажатию Esc
function openPopup(popupType) {
  popupType.classList.add("popup_opened");
  document.addEventListener("keydown", сlosePopupByEscape);
}

// Открытие попапа редактирования профиля пользователя
function openProfilePopup() {
  clearForm(profilePopup);
  userNameInput.value = document.querySelector(".profile__name").textContent;
  userJobInput.value = document.querySelector(".profile__job").textContent;
  openPopup(profilePopup);
}

// Открытие попапа добавления карточки
function opencardPopup() {
  clearForm(cardPopup);
  openPopup(cardPopup);
}

// Сброс (очистка) формы ввода (значений инпутов, сообщений об ошибке, состояния кнопки)
function clearForm(currentPopup) {
  const form = currentPopup.querySelector(".popup__form");
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  form.reset();
  inputs.forEach((input) => {
    const inputError = form.querySelector(`.${input.id}-error`);
    hideInputError(input, inputError, validationConfig);
  });
  toggleButtonState(form, inputs, validationConfig);
}

// Открытие попапа просмотра фотографии
function openPhoto(name, link, alt) {
  photoPopupCaption.textContent = name;
  photoPopupImage.src = link;
  photoPopupImage.alt = alt;
  openPopup(photoPopup);
}

// Добавление нового профиля пользователя (перезапись полей профиля и закрытие попапа)
function saveProfileSubmitHandler() {
  profileName.textContent = userNameInput.value;
  profileJob.textContent = userJobInput.value;
  closePopup(profilePopup);
}

// Закрытие попапа
function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", сlosePopupByEscape);
}

// Закрытие попапа нажатием Esc
function сlosePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector(".popup_opened");
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
profilePopupForm.addEventListener("submit", saveProfileSubmitHandler);

// Отслеживаем события попапа добавления новой карточки
cardPopupOpenBtn.addEventListener("click", () => opencardPopup(cardPopup));
cardPopupForm.addEventListener("submit", addCardSubmitHandler);

// Отслеживаем закрытие всех попапов (по клику на оверлей, по клику на крестик)
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  })
})
