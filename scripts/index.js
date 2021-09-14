// Выбор объектов для открытия и закрытия popup
const popup = document.querySelector(".popup");
const popupOpenBtn = document.querySelector(".edit-button");
const popupCloseBtn = popup.querySelector(".popup__close");

// Выбор объектов для вставки плейсхолдеров в поля формы
// и перезаписи полей профиля данными из формы
let nameInput = popup.querySelector(".popup__input_type_name");
let jobInput = popup.querySelector(".popup__input_type_job");
let form = popup.querySelector(".popup__container");
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");

// Выбор объектф для простановки лайков на фотографии
let likeButton = document.querySelectorAll(".gallery__card-like");

// Функция открытия-закрытия popup
function popupToggle() {
  popup.classList.toggle("popup_opened");
}

// Функции вставки плейсхолдеров в поля формы
function insertNamePlaceholder() {
  nameInput.setAttribute("placeholder", nameProfile.textContent);
}
function insertJobPlaceholder() {
  jobInput.setAttribute("placeholder", jobProfile.textContent);
}

// Функция переключения лайка на фотографии
function likeToggle(e) {
  if (e.currentTarget.getAttribute("src") === "./images/like_off.svg") {
    e.currentTarget.setAttribute("src", "./images/like_on.svg");
  }
  else {
    e.currentTarget.setAttribute("src", "./images/like_off.svg");
  }
}

// Обработчик события отправки формы при нажатии на кнопку "Сохранить"
function formSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle();
}

// Отслеживаем клики на кнопках открытия/закрытия popup
popupOpenBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);

// Вставляем плейсхолдеры в поля формы
insertNamePlaceholder();
insertJobPlaceholder();

// Перезаписываем поля профиля данными из формы
form.addEventListener("submit", formSubmitHandler);

// Отслеживаем клик на каждой кнопке лайка в галерее
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener("click", likeToggle);
}
