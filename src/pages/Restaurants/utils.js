// 함수형 라이브러리 사용하는 경우도 많다.

export function get({
  page,
  key,
}) {
  return (obj) => obj[page][key];
}

export function equal(key, value) {
  return (obj) => obj[key] === value;
}
