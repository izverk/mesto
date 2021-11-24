import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(confirmPopupSelector) {
    super(confirmPopupSelector);
    this._confirmBtnElement = this._popupElement.querySelector('.popup__save-button');
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmBtnElement.addEventListener('click', () => {
      this._confirmHandler(this._confirmedObject);
    });
  }
  // Определение обработчика подтверждения и его аргумента
  defineConfirmedAction({ confirmedAction, confirmedObject }) {
    this._confirmHandler = confirmedAction;
    this._confirmedObject = confirmedObject;
  }
}
