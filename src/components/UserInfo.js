export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userProfession = document.querySelector(userProfessionSelector);
  }
  //возвращает объект с данными пользователя, подставляем в форму при открытии
  getUserInfo() {
    return {
      name: this._userName.textContent,
      profession: this._userProfession.textContent
    }
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userProfession.textContent = data.profession;
  }
}

