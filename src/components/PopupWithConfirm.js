import Popup from './Popup.js';

// Класс попапа подтверждения действия
export default class PopupWithConfirm extends Popup {
  constructor(confirmPopupSelector) {
    super(confirmPopupSelector);
    this._confirmBtnElement = this._popupElement.querySelector('.popup__save-button');
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmBtnElement.addEventListener('click', () => {
      this._confirmHandler(this._confirmHandlerArgument);
    });
  }
  // Получение обработчика клика и его аргумента
  getConfirmHandler({ confirmHandler, confirmHandlerArgument }) {
    this._confirmHandler = confirmHandler;
    this._confirmHandlerArgument = confirmHandlerArgument;
  }
  // Замена надписи на кнопке при выполнении удаления
  changeBtnText() {
    this._confirmBtnElement.textContent = 'Удаление...';
  }
  restoreBtnTExt() {
    this._confirmBtnElement.textContent = 'Да';
  }
}
