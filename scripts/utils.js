// Функция закрытия попапа по нажатию на Esc
import { сlosePopupByEscape } from './index.js';

// Объекты попапа просмотра фотографии
const photoPopup = document.querySelector('.popup_type_image');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCaption = photoPopup.querySelector('.popup__caption');

// Открытие попапа и установка слушателей для закрытия по клику на оверлей или нажатию Esc
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', сlosePopupByEscape);
}

// Открытие попапа просмотра фотографии
function openPhoto(name, link, alt) {
  photoPopupCaption.textContent = name;
  photoPopupImage.src = link;
  photoPopupImage.alt = alt;
  openPopup(photoPopup);
}
export { openPhoto, openPopup };
