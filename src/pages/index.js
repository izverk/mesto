// ----------ИМПОРТЫ----------

// Файл стилей
import './index.css';
// Константы
import {
  validationConfig,
  cardsContainerSelector,
  cardTemplateSelector,
  cardPopupSelector,
  profilePopupSelector,
  pfotoPopupSelector,
  userNameSelector,
  userDescriptionSelector,
  userAvatarSelector,
} from '../utils/constants.js';
// Класс взаимодействия с сервором
import Api from '../components/Api.js';
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

// ================================== ОСНОВНОЙ АЛГОРИТМ ========================================

// ---------------- Создаем экземпляр класса Api для взаимодействия с сервером ----------------
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'da681d0f-779e-4fd5-82ae-9312d4a0fb2c',
    'Content-Type': 'application/json',
  },
});

// ========= Загружаем данные пользователя, создаем экз. пользователя, отображаем на странице =========
api
  .getUserInfo()
  .then(userData => {
    const userInfo = new UserInfo(
      userNameSelector,
      userDescriptionSelector,
      userAvatarSelector,
      userData
    );
    // выбираем только необходимые данные и отображаем
    const { name: userName, about: userDescription, avatar: avatarUrl } = userData;
    userInfo.setAvatar(avatarUrl);
    userInfo.setUserInfo({ userName, userDescription });

    // --------------- Создаем экземпляр класса попапа профиля пользователя ---------------------
    const popupWithProfileForm = new PopupWithForm({
      popupSelector: profilePopupSelector,
      // передаем обработчик события отправки формы
      formSubmitHandler: inputValues => {
        api
          .saveUser(inputValues)
          .then(newUserData => {
            userInfo.updateUserData(newUserData);
            userInfo.setUserInfo(inputValues);
            popupWithProfileForm.close();
          })
          .catch(err => {
            console.log(err);
          });
      },
    });
    // -------------------- Ставим слушатель на открытие попапа профиля -------------------------
    profileOpenBtn.addEventListener('click', () => {
      profileFormValidator.resetValidation();
      popupWithProfileForm.setInputValues(userInfo.getUserInfo()); // передаем поля профиля в инпуты формы
      popupWithProfileForm.open();
    });
  })
  .catch(err => {
    console.log(err);
  });

// ======== Загружаем начальный массив карточек, создаём экз. карточек и отрисовываем их =========
api
  .getInitialCards()
  .then(initialCards => {
    // обрезаем массив, оставляя первые 6 карточек
    initialCards = initialCards.slice(0, 6);

    // ---------------- Создаем экземпляр класса отрисовщика для галереи карточек ----------------
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
    // ------------------------------- Заполняем галерею карточками -----------------------------
    cardSection.renderItems();

    // ------------------------ Создаем экземпляр класса попапа карточки -------------------------
    const popupWithCardForm = new PopupWithForm({
      popupSelector: cardPopupSelector,
      // передаем обработчик события отправки формы
      formSubmitHandler: inputValues => {
        api
          .postCard(inputValues)
          .then(cardData => {
            console.log('данные карточки от сервера:', cardData);
            // выбираем только необходимые данные и отображаем
            cardSection.items = [{ name: cardData.name, link: cardData.link }];
            cardSection.renderItems();
            popupWithCardForm.close();
          })
          .catch(err => {
            console.log(err);
          });
      },
    });
    // ------------ Ставим слушатель на открытие попапа добавления новой карточки --------------
    cardPopupOpenBtn.addEventListener('click', () => {
      cardFormValidator.resetValidation();
      popupWithCardForm.open();
    });
  })
  .catch(err => {
    console.log(err);
  });

// Создаем экземпляр класса для попапа просмотра фотографии
const popupWithImage = new PopupWithImage(pfotoPopupSelector);

// Для каждой формы ввода создаем свой экземпляр класса валидаторов и запускаем валидацию
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();
