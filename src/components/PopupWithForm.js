import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputElements = Array.from(this._formElement.querySelectorAll('input'));
    this._bindedHandleFormSubmit = this._handleFormSubmit.bind(this);
  }
  setInputValues({ userName, userDescription }) {
    this._userNameInputElement = this._formElement.querySelector('.popup__input_type_name');
    this._userDescriptionInputElement = this._formElement.querySelector('.popup__input_type_job');
    this._userNameInputElement.value = userName;
    this._userDescriptionInputElement.value = userDescription;
  }
  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  _handleFormSubmit(evt) {
    evt.preventDefault;
    const inputValues = this._getInputValues();
    this._formSubmitHandler(inputValues);
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._bindedHandleFormSubmit);
  }
  close() {
    super.close();
    this._popupElement.removeEventListener('submit', this._bindedHandleFormSubmit);
    this._formElement.reset();
  }
}
