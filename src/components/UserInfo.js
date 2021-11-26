export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarImageSelector,
    userData: { about, avatar, cohort, name, _id },
  }) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;
    this._userAvatarImageSelector = userAvatarImageSelector;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarImageElement = document.querySelector(userAvatarImageSelector);
    this.about = about;
    this.avatar = avatar;
    this.cohort = cohort;
    this.name = name;
    this._id = _id;
  }
  // Получение значений из полей профиля
  getProfileFields() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }
  // Установка значений в поля профиля
  setProfileFields() {
    this._userNameElement.textContent = this.name;
    this._userDescriptionElement.textContent = this.about;
  }
  // Установка аватара
  setAvatar() {
    this._userAvatarImageElement.src = this.avatar;
  }
  // Обновить свойства экземпляра класса
  updateUserData(newUserData) {
    this.name = newUserData.name;
    this.about = newUserData.about;
    this.avatar = newUserData.avatar;
  }
}
