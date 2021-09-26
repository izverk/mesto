// Попап и кнопки его открытия/закрытия
const popup = document.querySelector(".popup");
const popupOpenBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = popup.querySelector(".popup__close-button");
// Форма и её поля ввода данных
let form = popup.querySelector(".popup__form");
let nameInput = popup.querySelector(".popup__input_type_name");
let jobInput = popup.querySelector(".popup__input_type_job");
// Поля профиля пользователя
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");

//Массив карточек с их именами и фотографиями
const initialCards = [
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

// Открытие попапа
function popupOpen() {
  popup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
// Закрытие попапа
function popupClose() {
  popup.classList.remove("popup_opened");
}
// Сохранение в форме ввода данных (перезапись полей профиля и закрытие попапа)
function formSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupClose();
}

// Отслеживаем клики на кнопках открытия/закрытия попапа
popupOpenBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupClose);
// Отслеживаем клик на кнопке Сохранить в форме ввода данных
form.addEventListener("submit", formSubmitHandler);
