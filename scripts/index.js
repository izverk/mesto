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

// Обработчик события отправки формы при нажатии на кнопку "Сохранить"
function formSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle();
}

// Отслеживание кликов для открытия/закрытия popup
popupOpenBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);

// Вставляем плейсхолдеры в поля формы
insertNamePlaceholder();
insertJobPlaceholder();

//перезаписываем поля профиля данными из формы
form.addEventListener("submit", formSubmitHandler);
