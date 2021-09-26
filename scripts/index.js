// Берем элемент попап и кнопки его открытия/закрытия
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = popup.querySelector('.popup__close-button');
// Берем форму редактирования профиля и её поля ввода данных
let form = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
// Берем поля профиля пользователя
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");
//Берем контейнер галереи для дальнейшей вставки в него карточек
const galleryList = document.querySelector('.gallery__list');
//Берем шаблон для создания карточки
const cardTemplate = document.querySelector('.card-template');
//Определяем массив карточек с их именами и путями к картинкам
//для первоначального заполнения галереи при загрузке страницы
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


//Создание карточки
function createCard(initialCards) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__name').textContent = initialCards.name;
  newCard.querySelector('.card__photo').setAttribute('src', initialCards.link);
  galleryList.append(newCard);
}
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


//Заполняем галерею карточками
initialCards.forEach(createCard);
// console.log(card.querySelector('.card__photo'))
// console.dir(card.querySelector('.card__photo'))
// Отслеживаем клики на кнопках открытия/закрытия попапа
popupOpenBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupClose);
// Отслеживаем клик на кнопке Сохранить в форме ввода данных
form.addEventListener("submit", formSubmitHandler);
