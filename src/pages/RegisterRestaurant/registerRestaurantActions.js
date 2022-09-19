import { fetchCategories } from '../../services/api';

export function setRestaurants(restaurants) {
  return {
    type: 'registerRestaurant/setRestaurants',
    payload: {
      restaurants,
    },
  };
}

export function updateRestaurantField({ sort, content }) {
  return {
    type: 'registerRestaurant/updateRestaurantField',
    payload: {
      sort,
      content,
    },
  };
}

export function addRestaurant() {
  return {
    type: 'registerRestaurant/addRestaurant',
  };
}

export function setCategories(categories) {
  return {
    type: 'registerRestaurant/setCategories',
    payload: {
      categories,
    },
  };
}

export function loadRestaurants() {
  return async (dispatch) => {
    const restaurants = [];
    // TODO: load restaurants from API server.
    // 1. API server 확보
    // 2. fetch
    dispatch(setRestaurants(restaurants));
  };
}

export function loadCategories() {
  return async (dispatch) => {
    const categories = await fetchCategories();

    dispatch(setCategories(categories));
  };
}
