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
