import { fetchRestaurantInformations } from '../../services/api';

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

export function setRestaurantInformations({ sort, data }) {
  return {
    type: 'registerRestaurant/setCategories',
    payload: {
      sort,
      data,
    },
  };
}

export function loadRestaurantInformations(sort) {
  return async (dispatch) => {
    const data = await fetchRestaurantInformations(sort);

    // TODO: load restaurants from API server.
    // 1. API server 확보
    // 2. fetch

    dispatch(setRestaurantInformations({
      sort,
      data,
    }));
  };
}
