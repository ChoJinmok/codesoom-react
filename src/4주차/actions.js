export function setRestaurants(restaurants) {
  return {
    type: 'setRestaurants',
    payload: {
      restaurants,
    },
  };
}

export function updateRestaurant(sort, content) {
  return {
    type: 'updateRestaurant',
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
