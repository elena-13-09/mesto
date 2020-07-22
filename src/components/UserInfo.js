export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userProfession = document.querySelector(userProfessionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  //возвращает объект с данными пользователя, подставляем в форму при открытии
  getUserInfo() {
    return {
      name: this._userName.textContent,
      profession: this._userProfession.textContent,
      avatar: this._userAvatar.textContent,
    }
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userProfession.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
  //принимает ссылку на изменение аватарки
  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}

