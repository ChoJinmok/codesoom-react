export async function fetchCategories() {
  // TODO: fetch GET / categories(복수) / categories/2(단수)
  // REST - CRUD => Read - collection(복수) / member, element(단수)

  const url = 'https://eatgo-customer-api.ahastudio.com/categories';
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export function x() {}
