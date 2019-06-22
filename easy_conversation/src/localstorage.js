// 记住密码，永久储存用户信息
const storage = window.localStorage;
export const setItem = (name,value) => {
    storage.setItem(name,JSON.stringify(value));
}
export const getItem = (name) => {
    return JSON.parse(storage.getItem(name));
}
export const deleteItemByItemName = (name) => {
    storage.removeItem(name)
}
// 没有记住密码，临时储存用户信息
const sessionStorage = window.sessionStorage;
export const setItemBySession = (name,value) => {
    sessionStorage.setItem(name,JSON.stringify(value));
}
export const getItemBySession = (name) => {
    return JSON.parse(sessionStorage.getItem(name));
}
export const deleteItemBySession = (name) => {
    return sessionStorage.removeItem(name)
}