//объекты для открытия и закрытия popup
const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.edit-button');
const popupCloseBtn = popup.querySelector('.popup__close');

//объекты для вставки плейсхолдеров в поля формы
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__name-text');
let jobProfile = document.querySelector('.profile__job');



//функция открытия-закрытия popup
function popupToggle() {
  popup.classList.toggle('popup_opened');
}
//функции вставки плейсхолдеров в поля формы
function insertNamePlaceholder() {
  nameInput.setAttribute('placeholder', nameProfile.textContent);
}
function insertJobPlaceholder() {
  jobInput.setAttribute('placeholder', jobProfile.textContent);
}

//открываем-закрываем popup
popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);

//вставляем плейсхолдеры в поля формы
insertNamePlaceholder();
insertJobPlaceholder();

