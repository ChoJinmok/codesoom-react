const registerRestaurantInitialState = {
  restaurant: {
    name: '',
    category: '',
    address: '',
  },
  restaurants: [],
};

const restaurantsInitialState = {
  accessToken: '',
  regions: [],
  categories: [],
  restaurants: [],
  filter: {
    regionName: null,
    categoryId: null,
  },
  restaurantDetail: null,
  loginFields: {
    email: '',
    password: '',
    error: '',
  },
  reviewFields: {
    score: '',
    description: '',
  },
};

export {
  registerRestaurantInitialState,
  restaurantsInitialState,
};
