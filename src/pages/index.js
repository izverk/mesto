// ----------ИМПОРТЫ----------

// Файл стилей
import './index.css';
// Константы
import {
  validationConfig,
  apiconfig,
  cardsContainerSelector,
  cardTemplateSelector,
  cardPopupSelector,
  profilePopupSelector,
  pfotoPopupSelector,
  confirmPopupSelector,
  userNameSelector,
  userDescriptionSelector,
  userAvatarSelector,
} from '../utils/constants.js';
// Класс взаимодействия с сервором
import Api from '../components/Api.js';
// Класс карточек
import Card from '../components/Card.js';
// Класс валидаторов форм ввода данных и объект его настроек
import FormValidator from '../components/FormValidator.js';
// Класс отрисовщиков элементов на странице
import Section from '../components/Section.js';
// Классs попапов
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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

// ---------- Экземпляр класса Api для взаимодействия с сервером -----------
export const api = new Api(apiconfig);

// ============== ЗАГРУЗКА ДАННЫХ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ, СОЗДАНИЕ ЭКЗЕМПЛЯРА, ==================
// ======================== ОТОБРАЖЕНИЕ НА СТРАНИЦЕ + ПОПАП ПРОФИЛЯ ============================
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
        popupWithProfileForm.changeBtnText('Сохранение...');
        api
          .editUser(inputValues)
          .then(newUserData => {
            userInfo.updateUserData(newUserData);
            userInfo.setUserInfo(inputValues);
            popupWithProfileForm.close();
            popupWithProfileForm.changeBtnText('Сохранить');
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

  // ========================= ПЕРВИЧНАЯ ЗАГРУЗКА ДАННЫХ КАРТОЧЕК, ===============================
  // ======================== ОТРИСОВКА + ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ ==============================
  .then(userInfo => {
    api
      .getInitialCards()
      .then(initialCards => {
        // сортируем полученный массив, ставя вперед карточки текущего пользователя
        initialCards.sort((a, b) => {
          let x, y;
          if (a.owner._id === userInfo._id) {
            x = 0;
          } else x = 1;
          if (b.owner._id === userInfo._id) {
            y = 0;
          } else y = 1;
          return x - y;
        });
        // обрезаем массив, оставляя первые 6 карточек
        initialCards = initialCards.slice(0, 6);

        // -------------Функция создания экземпляра карточки------------------
        function createCardExemp(cardData, userId) {
          const card = new Card(
            {
              data: { cardData, userId },
              // обработчик клика карточки (открытие фото)
              handleCardClick: (photoCaption, photoLink, photoDescription) => {
                popupWithImage.setEventListeners();
                popupWithImage.open(photoCaption, photoLink, photoDescription);
              },
              // обработчик клика лайка
              handleLikeClick: card => {
                console.log('card at input of handleLikeClick:', card);
                if (!card.isLiked) {
                  console.log('card.isLiked:', card.isLiked);
                  api
                    .setLike(card._id)
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
              // обработчик клика удаления карточки
              handleDelClick: card => {
                // забираем в класс попапа подтверждения обработчик подтверждения
                // и аргумент для него (card._id)
                popupWithCardDelConfirm.getConfirmHandler({
                  // обработчик подтверждения удаления
                  confirmHandler: cardId => {
                    popupWithCardDelConfirm.changeBtnText('Удаление...');
                    api
                      .deleteCard(cardId)
                      .then(() => {
                        popupWithCardDelConfirm.close();
                        card.deleteCardElement();
                        popupWithCardDelConfirm.changeBtnText('Да');
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  },
                  confirmHandlerArgument: card._id,
                });
                popupWithCardDelConfirm.setEventListeners();
                popupWithCardDelConfirm.open();
              },
            },
            cardTemplateSelector
          );
          return card;
        }
        // -------------- Экземпляр отрисовщика -----------------------
        const cardSection = new Section(
          {
            initialCards,
            renderer: cardData => {
              // метод отрисовки отдельной карточки
              const card = createCardExemp(cardData, userInfo._id);
              console.log('card:', card);
              const cardElement = card.generateCard();
              return cardElement;
            },
          },
          cardsContainerSelector
        );
        // рендерим карточки
        cardSection.renderItems();

        // ---------- Экземпляр попапа добавления карточки -----------
        const popupWithCardForm = new PopupWithForm({
          popupSelector: cardPopupSelector,
          // обработчик события отправки формы
          formSubmitHandler: inputValues => {
            popupWithCardForm.changeBtnText('Сохранение...');
            api
              .postCard(inputValues)
              .then(сardData => {
                cardSection.items = [сardData];
                cardSection.renderItems(); // рендерим карточки
                popupWithCardForm.close();
                popupWithCardForm.changeBtnText('Сохранить');
              })
              .catch(err => {
                console.log(err);
              });
          },
        });
        // --------- Открытие попапа добавления карточки ------------
        cardPopupOpenBtn.addEventListener('click', () => {
          cardFormValidator.resetValidation();
          popupWithCardForm.open();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

// =============================== ПРОЧИЕ ПОПАПЫ + ВАЛИДАЦИЯ ===================================

// --------- Экземпляр попапа просмотра фотографии --------------
const popupWithImage = new PopupWithImage(pfotoPopupSelector);

// --------- Экземпляр попапа потверждения удаления -------------
const popupWithCardDelConfirm = new PopupWithConfirm(confirmPopupSelector);
console.log('ЭКЗЕМПЛЯР popupWithCardDelConfirm:', popupWithCardDelConfirm);

// -------------- Экземпляры класса валидаторов -----------------
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
// запускаем валидацию
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
