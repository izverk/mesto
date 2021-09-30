// ----------ПЕРЕМЕННЫЕ----------

// Объекты профиля пользователя
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Объекты попапа редактирования профиля пользователя
const ProfilePopup = document.querySelector(".popup_type_profile");
const ProfilePopupOpenBtn = document.querySelector(".profile__edit-button");
const ProfilePopupCloseBtn = ProfilePopup.querySelector(".popup__close-button");
const ProfilePopupForm = ProfilePopup.querySelector(".popup__form");
const userNameInput = ProfilePopup.querySelector(".popup__input_type_name");
const userJobInput = ProfilePopup.querySelector(".popup__input_type_job");

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

// Объекты шаблона карточки
const cardTemplate = document.querySelector(".card-template");

// Массив карточек для первоначального заполнения галереи при загрузке страницы
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    description: "Фотография долины между высоких гор",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    description: "Фотография небольшой реки между заснеженных лесных склонов",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    description:
      "Фотография комплекса панельных многоэтажек в наступающих сумерках",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    description: "Фотография одинокого вулкана в пустынной местности",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    description:
      "Фотография одноколейной железной дороги, уходящей вдаль через лес",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    description: "Фотография прибрежных скал Байкала",
  },
];

// ----------ФУНКЦИИ----------

// Создание и добавление карточки в галерею
function createCard(initialCard) {
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardName = newCard.querySelector(".card__name");
  const newCardPhoto = newCard.querySelector(".card__photo");
  const newCardLike = newCard.querySelector(".card__like");
  const newCardDeleteBtn = newCard.querySelector(".card__delete");
  newCardName.textContent = initialCard.name;
  newCardPhoto.setAttribute("src", initialCard.link);
  newCardPhoto.setAttribute("alt", initialCard.description);
  newCardPhoto.addEventListener("click", openPhoto);
  newCardLike.addEventListener("click", likeToggle);
  newCardDeleteBtn.addEventListener("click", deleteCard);
  gallery.prepend(newCard);
}
// Добавление новой карточки из формы ввода
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const newPlace = [
    {
      name: placeNameInput.value,
      link: imageLinkInput.value,
      description: `Фотография места. ${placeNameInput.value}`,
    },
  ];
  newPlace.forEach(createCard);
  closePopup(cardPopup);
  placeNameInput.value = "";
  imageLinkInput.value = "";
}
// Добавление нового профиля (перезапись полей профиля и закрытие попапа)
function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileJob.textContent = userJobInput.value;
  closePopup(ProfilePopup);
}
// Открытие попапа
function openPopup(popupType) {
  popupType.classList.add("popup_opened");
  if (popupType === ProfilePopup) {
    userNameInput.value = document.querySelector(".profile__name").textContent;
    userJobInput.value = document.querySelector(".profile__job").textContent;
  }
}
// Закрытие попапа
function closePopup(popupType) {
  popupType.classList.remove("popup_opened");
}
// Открытие фотографии для просмотра
function openPhoto(evt) {
  photoPopupImage.src = evt.currentTarget.src;
  photoPopupCaption.textContent =
    evt.currentTarget.parentElement.previousElementSibling.textContent;
  openPopup(photoPopup);
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

// Отслеживаем события попапа редактирования профиля
ProfilePopupOpenBtn.addEventListener("click", () => openPopup(ProfilePopup));
ProfilePopupCloseBtn.addEventListener("click", () => closePopup(ProfilePopup));
ProfilePopupForm.addEventListener("submit", editProfileSubmitHandler);

// Отслеживаем события попапа добавления новой карточки
cardPopupOpenBtn.addEventListener("click", () => openPopup(cardPopup));
cardPopupCloseBtn.addEventListener("click", () => closePopup(cardPopup));
cardPopupForm.addEventListener("submit", addCardSubmitHandler);

// Отслеживаем закрытие попапа просмотра фотографии (отслеживание открытия
// попапа устанавливается в функциях создания карточки)
photoPopupCloseBtn.addEventListener("click", () => closePopup(photoPopup));
