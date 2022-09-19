// import { equal } from './utils';

const initialState = {
  regions: [],
  categories: [],
  restaurants: [],
  filter: {
    regionName: null,
    categoryId: null,
  },
  restaurantDetail: null,
};

const reducers = {
  'restaurantsApp/setRestaurantInformations': (state, { payload: { sort, data } }) => ({
    ...state,
    [sort]: data,
  }),

  'restaurantsApp/applyFilter': (state, { payload: { field, content } }) => {
    const { filter } = state;

    return {
      ...state,
      filter: {
        ...filter,
        [field]: content,
        // selectedRegion: regions.find((region) => region.id === regionId)
        // selectedRegion: regions.find(equal('id', regionId))
      },
    };
  },

  'restaurantsApp/setRestaurants': (state, { payload: { restaurants } }) => ({
    ...state,
    restaurants,
  }),

  'restaurantsApp/setRestaurantDetail': (state, { payload: { restaurantDetail } }) => ({
    ...state,
    restaurantDetail,
  }),
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
