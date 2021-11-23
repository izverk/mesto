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

// -------------Функция создания экземпляра карточки------------------
function createCardExemp(cardData, userId) {
  const card = new Card(
    {
      data: { cardData, userId },
      // передаем обработчик клика карточки (открытие фото)
      handleCardClick: (photoCaption, photoLink, photoDescription) => {
        popupWithImage.setEventListeners();
        popupWithImage.open(photoCaption, photoLink, photoDescription);
      },
      // передаем обработчик клика лайка
      handleLikeClick: card => {
        console.log('card at input of handleLikeClick:', card);
        if (!card.isLiked) {
          console.log('card.isLiked:', card.isLiked);
          api
            .saveLike(card._id)
            .then(updatedCardData => {
              card.handleServerResForLike(updatedCardData);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('card.isLiked:', card.isLiked);
          api
            .deleteLike(card._id)
            .then(updatedCardData => {
              card.handleServerResForLike(updatedCardData);
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      handleDelButtonClick: 'qwe',
    },
    cardTemplateSelector
  );
  return card;
}

// ---------- Экземпляр класса Api для взаимодействия с сервером -----------
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'da681d0f-779e-4fd5-82ae-9312d4a0fb2c',
    'Content-Type': 'application/json',
  },
});

// ============== ЗАГРУЗКА ДАННЫХ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ, СОЗДАНИЕ ЭКЗЕМПЛЯРА, ОТРИСОВКА ============
api
  .getUserInfo()
  .then(userData => {
    const userInfo = new UserInfo({
      userNameSelector,
      userDescriptionSelector,
      userAvatarSelector,
      userData,
    });
    console.log('userData:', userData);
    // выбираем необходимые данные и отображаем странице
    const { name: userName, about: userDescription, avatar: avatarUrl } = userData;
    userInfo.setAvatar(avatarUrl);
    userInfo.setUserInfo({ userName, userDescription });

    // ----------- Экземпляр попапа профиля -----------------
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
    // ------------- Открытие попапа профиля ----------------
    profileOpenBtn.addEventListener('click', () => {
      profileFormValidator.resetValidation();
      popupWithProfileForm.setInputValues(userInfo.getUserInfo()); // передаем поля профиля в инпуты формы
      popupWithProfileForm.open();
    });
    return userInfo;
  })

  // ========================= ПЕРВИЧНАЯ ЗАГРУЗКА и ОТРИСОВКА КАРТОЧЕК ===========================
  .then(userInfo => {
    api
      .getInitialCards()
      .then(initialCards => {
        // обрезаем массив, оставляя первые 6 карточек
        initialCards = initialCards.slice(0, 6);

        // -------------- Экземпляр отрисовщика -----------------------
        const cardSection = new Section(
          {
            initialCards,            
            renderer: cardData => { // метод отрисовки отдельной карточки
              const card = createCardExemp(cardData, userInfo._id);
              console.log('card:', card);
              const cardElement = card.generateCard();
              return cardElement;
            },
          },
          cardsContainerSelector
        );
        cardSection.renderItems(); // рендерим карточки

        // ------------- Экземпляр попапа карточки ---------------------
        const popupWithCardForm = new PopupWithForm({
          popupSelector: cardPopupSelector,
          // обработчик события отправки формы
          formSubmitHandler: inputValues => {
            api
              .postCard(inputValues)
              .then(сardData => {
                cardSection.items = [сardData];
                cardSection.renderItems(); // рендерим карточки
                popupWithCardForm.close();
              })
              .catch(err => {
                console.log(err);
              });
          },
        });
        // --------- Открытие попапа добавления новой карточки ------------
        cardPopupOpenBtn.addEventListener('click', () => {
          cardFormValidator.resetValidation();
          popupWithCardForm.open();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

// --------- Экземпляр попапа просмотра фотографии -------------
const popupWithImage = new PopupWithImage(pfotoPopupSelector);

// Для каждой формы ввода создаем свой экземпляр класса валидаторов и запускаем валидацию
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();
