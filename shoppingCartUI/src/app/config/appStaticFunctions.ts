export class  appSettingFunctions {
    // User Login Page Messages
    public static setLocalStorage(localStorageKey,localStorageValue){
        localStorage.setItem(localStorageKey,localStorageValue);
        return true;
    }
    public static getLocalStorage(localStorageKey){
        return localStorage.getItem(localStorageKey);
    }
    public static clearLocalStorage(){
        localStorage.clear();
        return true;
    }
}