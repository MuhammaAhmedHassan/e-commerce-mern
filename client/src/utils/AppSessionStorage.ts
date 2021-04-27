type AppSessionStorage_Keys = "SET_ADMIN";

export default class AppSessionStorage {
  static setItem(key: AppSessionStorage_Keys, value: string) {
    sessionStorage.setItem(key, value);
  }

  static getItem(key: AppSessionStorage_Keys) {
    return sessionStorage.getItem(key);
  }

  static removeItem(key: AppSessionStorage_Keys) {
    sessionStorage.removeItem(key);
  }
}
