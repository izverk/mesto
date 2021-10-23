// Объект настроек с селекторами и классами элементов, используемых при валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  invalidInputClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_active',
  submitButtonClass: 'popup__save-button_inactive',
};

// Класс "Валидатор формы"
class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._invalidInputClass = validationConfig.invalidInputClass;
    this._errorClass = validationConfig.errorClass;
    this._submitButtonClass = validationConfig.submitButtonClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  }
  _hasInvalidInput() {
    return this._inputList.some(input => {
      return input.validity.valid === false;
    });
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._submitButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._submitButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
  _showInputError(input, error) {
    input.classList.add(this._invalidInputClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }
  _hideInputError = (input, error) => {
    input.classList.remove(this._invalidInputClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };
  _isValid(input) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, error);
    } else {
      this._hideInputError(input, error);
    }
  }
  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValid(input);
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

// Создаем для каждой формы ввода свой объект валидатора при загрузке страницы
const forms = Array.from(document.querySelectorAll('.popup__form'));
forms.forEach(formElement => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});
