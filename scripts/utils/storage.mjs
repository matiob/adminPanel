export function getStorage(key="") {
    const storage = JSON.parse(window.localStorage.getItem(key)) || [];
    return storage;
}

export function setStorage(key, array=[]) {
    const storage = JSON.stringify(array);
    window.localStorage.setItem(key, storage);
}
