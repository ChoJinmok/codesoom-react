export async function fetchRestaurantInformations() {
  return [];
}

export async function fetchCategories() {
  return [];
}

export async function fetchRestaurants() {
  return [];
}

export async function fetchRestaurantDetail({ restaurantId }) {
  return {
    restaurantId,
  };
}

// export async function postLogin({ email, password }) {
//   return {
//     email,
//     password,
//   };
// }

// export async function postLogin({ email, password }) {
//   const EMAIL = 'tester@example.com';
//   const PASSWORD = 'test';

//   if (!(EMAIL === email && PASSWORD === password)) {
//     return undefined;
//   }

//   return 'ACCESS_TOKEN';
// }

export const postLogin = jest.fn();

export async function postReview({
  accessToken, restaurantId, score, description,
}) {
  return {
    accessToken,
    restaurantId,
    score,
    description,
  };
}
