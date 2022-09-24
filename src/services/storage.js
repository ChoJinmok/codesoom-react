// 따로 storage 만들어주는 이유는 localStorage 외에 다른 대안을 사용하는 경우 고쳐주기 쉬움(index DB)

export function saveItem(key, value) {
  localStorage.setItem(key, value);
}

export function loadItem(key) {
  return localStorage.getItem(key);
}

export function deleteItem(key) {
  localStorage.removeItem(key);
}
