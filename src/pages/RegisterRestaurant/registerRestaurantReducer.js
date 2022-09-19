import { v4 as uuidv4 } from 'uuid';

const initialState = {
  restaurant: {
    name: '',
    category: '',
    address: '',
  },
  restaurants: [],
  categories: [],
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  const { restaurant, restaurants } = state;
  const { type, payload } = action;

  const index = {
    'registerRestaurant/setRestaurants': () => ({
      ...state,
      restaurants: payload.restaurants,
    }),

    'registerRestaurant/updateRestaurantField': () => {
      const { sort, content } = payload;

      return {
        ...state,
        restaurant: {
          ...restaurant,
          [sort]: content,
        },
      };
    },

    'registerRestaurant/addRestaurant': () => {
      const restaurantValues = Object.values(restaurant);
      for (let i = 0; i < restaurantValues.length; i += 1) {
        if (!restaurantValues[i]) return state;
      }

      const { name, category, address } = restaurant;

      return {
        ...state,
        restaurant: initialState.restaurant,
        restaurants: [
          ...restaurants,
          {
            id: uuidv4(),
            name,
            category,
            address,
          },
        ],
      };
    },

    'registerRestaurant/setCategories': () => {
      const { sort, data } = payload;

      return {
        ...state,
        [sort]: data,
      };
    },

    default: () => state,
  };

  return (index[type] || index.default)();
}
