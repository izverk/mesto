export const apiconfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'da681d0f-779e-4fd5-82ae-9312d4a0fb2c',
    'Content-Type': 'application/json',
  },
};

// Селектор шаблона карточки
export const cardTemplateSelector = '.card-template';

// Селектор контейнера для добавления новых карточек
export const cardsContainerSelector = '.gallery__list';

// Селектор попапа профиля
export const profilePopupSelector = '.popup_type_profile';

// Селектор попапа аватарки
export const avatarPopupSelector = '.popup_type_avatar';

// Селектор попапа создания карточки
export const cardPopupSelector = '.popup_type_card';

// Селектор попапа просмотра фото
export const pfotoPopupSelector = '.popup_type_image';

// Селектор попапа подтверждения удаления
export const confirmPopupSelector = '.popup_type_confirm';

// Селекторы элементов профиля пользователя
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__job';
export const userAvatarImageSelector = '.profile__avatar';

// Объект настроек с селекторами и классами элементов, используемых при валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  invalidInputClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_active',
  submitButtonClass: 'popup__save-button_inactive',
};
