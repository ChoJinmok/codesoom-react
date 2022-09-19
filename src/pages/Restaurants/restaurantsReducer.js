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
  'restaurants/setRestaurantInformations': (state, { payload: { sort, data } }) => ({
    ...state,
    [sort]: data,
  }),

  'restaurants/applyFilter': (state, { payload: { field, content } }) => {
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

  'restaurants/setRestaurants': (state, { payload: { restaurants } }) => ({
    ...state,
    restaurants,
  }),

  'restaurants/setRestaurantDetail': (state, { payload: { restaurantDetail } }) => ({
    ...state,
    restaurantDetail,
  }),
};

function defaultReducer(state) {
  return state;
}

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
