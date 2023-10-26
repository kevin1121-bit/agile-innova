export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getLocalStorageByKey(key) {
    return parseInt(localStorage.getItem(key));
}