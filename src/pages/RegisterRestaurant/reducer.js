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

export default function reducer(state = initialState, action) {
  const { restaurant, restaurants } = state;
  const { type, payload } = action;

  const index = {
    setRestaurants: () => ({
      ...state,
      restaurants: payload.restaurants,
    }),

    updateRestaurantField: () => {
      const { sort, content } = payload;

      return {
        ...state,
        restaurant: {
          ...restaurant,
          [sort]: content,
        },
      };
    },

    addRestaurant: () => {
      const restaurantValues = Object.values(restaurant);
      for (let i = 0; i < restaurantValues.length; i += 1) {
        if (!restaurantValues[i]) return state;
      }

      const { name, category, address } = restaurant;

      return {
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

    default: () => state,
  };

  return (index[type] || index.default)();
}
