// import { equal } from './utils';

const initialReviewFields = {
  score: '',
  description: '',
};

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
    ...initialReviewFields,
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

  'restaurants/setRestaurantDetail': (state, { payload: { restaurantDetail } }) => {
    if (!restaurantDetail) {
      return {
        ...state,
        restaurantDetail,
      };
    }

    return {
      ...state,
      restaurantDetail: {
        ...restaurantDetail,
        reviews: [...restaurantDetail.reviews].sort((a, b) => b.id - a.id),
      },
    };
  },

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

  'restaurants/clearReviewFields': (state) => ({
    ...state,
    reviewFields: {
      ...initialReviewFields,
    },
  }),

  'restaurants/setReviews': (state, { payload: { reviews } }) => {
    const { restaurant } = state;

    return {
      ...state,
      restaurant: {
        ...restaurant,
        reviews: [...reviews].sort((a, b) => b.id - a.id),
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
