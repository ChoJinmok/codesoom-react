export function setRestaurants(restaurants) {
  return {
    type: 'setRestaurants',
    payload: {
      restaurants,
    },
  };
}

export function updateRestaurantField({ sort, content }) {
  return {
    type: 'updateRestaurantField',
    payload: {
      sort,
      content,
    },
  };
}

export function addRestaurant() {
  return {
    type: 'addRestaurant',
  };
}

export function setCategories(categories) {
  return {
    type: 'setCategories',
    payload: {
      categories,
    },
  };
}
