// ----------ПЕРЕМЕННЫЕ----------

// Объекты попапа редактирования профиля пользователя
const editProfilePopup = document.querySelector(".popup_type_profile");
const editProfilePopupOpenBtn = document.querySelector(".profile__edit-button");
const editProfilePopupCloseBtn = editProfilePopup.querySelector(
  ".popup__close-button"
);
const editProfilePopupForm = editProfilePopup.querySelector(".popup__form");
const userNameInput = editProfilePopup.querySelector(".popup__input_type_name");
const userJobInput = editProfilePopup.querySelector(".popup__input_type_job");
// Объекты попапа добавления новой карточки в галерею
const cardPopup = document.querySelector(".popup_type_card");
const cardPopupOpenBtn = document.querySelector(".profile__add-button");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close-button");
const cardPopupForm = cardPopup.querySelector(".popup__form");
const placeNameInput = cardPopup.querySelector(
  ".popup__input_type_placename"
);
const imageLinkInput = cardPopup.querySelector(
  ".popup__input_type_imagelink"
);
const gallery = document.querySelector(".gallery__list"); // контейнер для добавления в него карточек
// Объекты попапа просмотра фотографии
const photoPopup = document.querySelector(".popup_type_image");
const photoPopupCloseBtn = photoPopup.querySelector(
  ".popup__close-button"
);
const photoPopupImage = photoPopup.querySelector(".popup__image");
const photoPopupCaption = photoPopup.querySelector('.popup__caption');
// Объекты шаблона карточки
const cardTemplate = document.querySelector(".card-template");
// Массив карточек для первоначального заполнения галереи при загрузке страницы
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// ----------ФУНКЦИИ----------

// Создание и добавление карточки в галерею
function createCard(initialCards) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardName = newCard.querySelector(".card__name");
  const cardPhoto = newCard.querySelector(".card__photo");
  const cardLike = newCard.querySelector(".card__like");
  const cardDelete = newCard.querySelector(".card__delete");
  cardName.textContent = initialCards.name;
  cardPhoto.setAttribute("src", initialCards.link);
  cardPhoto.addEventListener("click", openPhoto);
  cardLike.addEventListener("click", likeToggle);
  cardDelete.addEventListener("click", deleteCard);
  gallery.prepend(newCard);
}
// Открытие попапов
function openPopup(popupType) {
  popupType.classList.add("popup_opened");
  if (popupType === editProfilePopup) {
    userNameInput.value = document.querySelector(".profile__name").textContent;
    userJobInput.value = document.querySelector(".profile__job").textContent;
  }
}
// Закрытие попапов
function closePopup(popupType) {
  popupType.classList.remove("popup_opened");
}
// Подготовка и открытие фотографии карточки для просмотра
function openPhoto(evt) {
  photoPopupImage.src = evt.currentTarget.src;
  photoPopupCaption.textContent = evt.currentTarget.parentElement.previousElementSibling.textContent;
  openPopup(photoPopup);
}
// Обработка cохранения в форме редактирования профиля
// (перезапись полей профиля и закрытие попапа)
function profileSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  document.querySelector(".profile__name").textContent = userNameInput.value;
  document.querySelector(".profile__job").textContent = userJobInput.value;
  closePopup(editProfilePopup);
}
// Обработка нажатия кнопки Сохранение в форме добавления карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  const newPlace = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };
  initialCards.splice(0, initialCards.length, newPlace); // обновление массива карточек данными из формы
  initialCards.forEach(createCard);
  placeNameInput.value = "";
  imageLinkInput.value = "";
  closePopup(cardPopup);
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
initialCards.forEach(createCard);
// Отслеживаем открытие/закрытие/сохранение попапа редактирования профиля
editProfilePopupOpenBtn.addEventListener("click", () =>
  openPopup(editProfilePopup)
);
editProfilePopupCloseBtn.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
editProfilePopupForm.addEventListener("submit", profileSubmitHandler);
// Отслеживаем открытие/закрытие/сохранение попапа добавления новой карточки
cardPopupOpenBtn.addEventListener("click", () => openPopup(cardPopup));
cardPopupCloseBtn.addEventListener("click", () => closePopup(cardPopup));
cardPopupForm.addEventListener("submit", addCardSubmitHandler);
// Отслеживаем закрытие попапа просмотра фотографии
photoPopupCloseBtn.addEventListener("click", () =>
  closePopup(photoPopup)
);
