// import { equal } from './utils';

const initialState = {
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

  'restaurants/changeLoginField': (state, { payload: { name, value } }) => {
    const { loginFields } = state;

    return {
      ...state,
      loginFields: {
        ...loginFields,
        [name]: value,
      },
    };
  },

  'restaurants/setAccessToken': (state, { payload: { accessToken } }) => ({
    ...state,
    accessToken,
  }),

  'restaurants/logout': (state) => ({
    ...state,
    accessToken: '',
  }),

  'restaurants/changeReviewField': (state, { payload: { name, value } }) => {
    const { reviewFields } = state;

    return {
      ...state,
      reviewFields: {
        ...reviewFields,
        [name]: value,
      },
    };
  },
};

function defaultReducer(state) {
  return state;
}

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
