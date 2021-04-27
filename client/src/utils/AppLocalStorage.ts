type AppLocalStorage_Keys =
  | "EMAIL_FOR_REGISTRATION"
  | "USER_AUTH_TOKEN"
  | "USER_ROLE";

class AppLocalStorage {
  static setItem(key: AppLocalStorage_Keys, value: string) {
    localStorage.setItem(key, value);
  }
  static getItem(key: AppLocalStorage_Keys) {
    return localStorage.getItem(key);
  }

  static removeItem(key: AppLocalStorage_Keys) {
    localStorage.removeItem(key);
  }
}

export { AppLocalStorage };
