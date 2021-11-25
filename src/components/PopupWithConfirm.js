import Popup from './Popup.js';

// Класс попапа подтверждения действия
export default class PopupWithConfirm extends Popup {
  constructor(confirmPopupSelector) {
    super(confirmPopupSelector);
  }
  setEventListeners() {
    super.setEventListeners();
    this._saveBtnElement.addEventListener('click', () => {
      this._confirmHandler(this._confirmHandlerArgument);
    });
  }
  // Получение обработчика клика и его аргумента
  getConfirmHandler({ confirmHandler, confirmHandlerArgument }) {
    this._confirmHandler = confirmHandler;
    this._confirmHandlerArgument = confirmHandlerArgument;
  }
}
