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

export async function postLogin() {
  return 'ACCESS_TOKEN';
}

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
