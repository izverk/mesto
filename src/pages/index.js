// ----------ИМПОРТЫ----------

// Файл стилей
import './index.css';
// Исходный массив с данными карточек
import {
  initialCards,
  validationConfig,
  cardsContainerSelector,
  cardTemplateSelector,
  cardPopupSelector,
  profilePopupSelector,
  pfotoPopupSelector,
  userNameElementSelector,
  userDescriptionSelector,
} from '../utils/constants.js';
// Класс карточек
import Card from '../components/Card.js';
// Класс валидаторов форм ввода данных и объект его настроек
import { FormValidator } from '../components/FormValidator.js';
// Класс отрисовщиков элементов на странице
import Section from '../components/Section.js';
// Класс попапов
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
// Класс данных о пользователе
import UserInfo from '../components/UserInfo.js';

// ----------ВЫБОР ЭЛЕМЕНТОВ DOM----------

// Элементы попапа редактирования профиля пользователя
const profileOpenBtn = document.querySelector('.profile__edit-button');
const profileFormElement = document
  .querySelector('.popup_type_profile')
  .querySelector('.popup__form');

// Элементы попапа создания карточки
const cardPopupOpenBtn = document.querySelector('.profile__add-button');
const cardFormElement = document.querySelector('.popup_type_card').querySelector('.popup__form');

// ----------ДЕЙСТВИЯ----------

// Создаем экземпляр класса отрисовщика для первоначального заполнения галереи карточками
const cardSection = new Section(
  {
    initialCards,
    // передаем метод отрисовки отдельной карточки
    renderer: data => {
      const card = new Card(
        {
          data,
          handleCardClick: (photoCaption, photoLink, photoDescription) => {
            popupWithImage.setEventListeners();
            popupWithImage.open(photoCaption, photoLink, photoDescription);
          },
        },
        cardTemplateSelector
      );
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  cardsContainerSelector
);

// Заполняем галерею карточками при загрузке страницы
cardSection.renderItems();

// Создаем экземпляр класса для попапа создания карточки
const popupWithCardForm = new PopupWithForm({
  popupSelector: cardPopupSelector,
  // передаем обработчик события отправки формы создания карточки
  formSubmitHandler: inputValues => {
    cardSection._items = [inputValues];
    cardSection.renderItems();
    popupWithCardForm.close();
  },
});

// Создаем экземпляр класса для попапа профиля пользователя
const popupWithProfileForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  formSubmitHandler: inputValues => {
    userInfo.setUserInfo(inputValues);
    popupWithProfileForm.close();
  },
});

// Создаем экземпляр класса для попапа просмотра фотографии
const popupWithImage = new PopupWithImage(pfotoPopupSelector);

// Создаём экземпляр класса с данными о пользователе
const userInfo = new UserInfo(userNameElementSelector, userDescriptionSelector);

// Для каждой формы ввода создаем свой экземпляр класса валидаторов и запускаем валидацию
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();

// Отслеживаем открытие попапа редактирования профиля
profileOpenBtn.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  popupWithProfileForm.setInputValues(userInfo.getUserInfo()); // передаем поля профиля в инпуты формы
  popupWithProfileForm.open();
});

// Отслеживаем открытие попапа добавления новой карточки
cardPopupOpenBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupWithCardForm.open();
});
