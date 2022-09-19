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
  setRestaurantInformations(state, { payload: { sort, data } }) {
    return {
      ...state,
      [sort]: data,
    };
  },

  applyFilter(state, { payload: { field, content } }) {
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

  setRestaurants(state, { payload: { restaurants } }) {
    return {
      ...state,
      restaurants,
    };
  },

  setRestaurantDetail(state, { payload: { restaurantDetail } }) {
    return {
      ...state,
      restaurantDetail,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
