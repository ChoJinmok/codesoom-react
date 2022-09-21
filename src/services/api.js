export async function fetchRestaurantInformations(information) {
  // TODO: fetch GET / categories(복수) / categories/2(단수)
  // REST - CRUD => Read - collection(복수) / member, element(단수)

  const url = `https://eatgo-customer-api.ahastudio.com/${information}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function fetchRestaurants({ regionName, categoryId }) {
  const url = 'https://eatgo-customer-api.ahastudio.com/restaurants'
    + `?region=${regionName}&category=${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurantDetail({ restaurantId }) {
  const url = `https://eatgo-customer-api.ahastudio.com/restaurants/${restaurantId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// 외부와 연동이 되는 경우에는 E2E테스트 혹은 실제로 api자체를 테스트하는 코드를 따로 돌려서 확인을 해주는 것이 좋다.
// 나중에 axios 사용해보기
export async function postLogin({ email, password }) {
  const url = 'https://eatgo-login-api.ahastudio.com/session';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await response.json();
  return accessToken;
}
