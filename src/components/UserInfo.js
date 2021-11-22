export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector, userData) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._userData = userData;
    this._userId = this._userData._id
  }
  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }
  setUserInfo({ userName, userDescription }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
  setAvatar(avatarUrl) {
    this._userAvatarElement.src = avatarUrl;
  }
  updateUserData(newUserData) {
    this._userData.name = newUserData.name;
    this._userData.about = newUserData.about;
  }
}
