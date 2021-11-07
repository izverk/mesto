export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.userName = this._userNameElement.textContent;
    userInfo.userJob = this._userJobElement.textContent;
    return userInfo;
  }
  // setUserInfo({userName, userJob}) {
  setUserInfo(inputValues) {
    this._userNameElement.textContent = inputValues[0].userName;
    this._userJobElement.textContent = inputValues[0].userJob;
  }
}
