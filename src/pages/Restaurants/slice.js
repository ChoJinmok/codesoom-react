import { createSlice } from '@reduxjs/toolkit';

import {
  fetchRestaurantInformations,
  fetchRestaurants,
  fetchRestaurantDetail,
  postLogin,
  postReview,
} from '../../services/api';

import {
  saveItem,
  deleteItem,
} from '../../services/storage';

// import { equal } from './utils';

const initialReviewFields = {
  score: '',
  description: '',
};

const { actions, reducer } = createSlice({
  name: 'restaurantsApp',
  initialState: {
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
  },
  reducers: {
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

    setRestaurants(state, { payload: restaurants }) {
      return {
        ...state,
        restaurants,
      };
    },

    setRestaurantDetail(state, { payload: restaurantDetail }) {
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

    changeLoginField(state, { payload: { name, value } }) {
      const { loginFields } = state;

      return {
        ...state,
        loginFields: {
          ...loginFields,
          [name]: value,
        },
      };
    },

    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
      };
    },

    logout(state) {
      return {
        ...state,
        accessToken: '',
      };
    },

    changeReviewField(state, { payload: { name, value } }) {
      const { reviewFields } = state;

      return {
        ...state,
        reviewFields: {
          ...reviewFields,
          [name]: value,
        },
      };
    },

    clearReviewFields(state) {
      return {
        ...state,
        reviewFields: {
          ...initialReviewFields,
        },
      };
    },

    setReviews(state, { payload: reviews }) {
      const { restaurantDetail } = state;

      return {
        ...state,
        restaurantDetail: {
          ...restaurantDetail,
          reviews: [...reviews].sort((a, b) => b.id - a.id),
        },
      };
    },
  },
});

export const {
  setRestaurantInformations,
  applyFilter,
  setRestaurants,
  setRestaurantDetail,
  changeLoginField,
  setAccessToken,
  logout,
  changeReviewField,
  clearReviewFields,
  setReviews,
} = actions;

export function loadRestaurantInformations(sort) {
  return async (dispatch) => {
    const data = await fetchRestaurantInformations(sort);

    dispatch(setRestaurantInformations({
      sort,
      data,
    }));
  };
}

export function loadRestaurants() {
  return async (dispatch, getState) => {
    const {
      restaurantsApp: {
        filter: { regionName, categoryId },
      },
    } = getState();

    const restaurants = await fetchRestaurants({ regionName, categoryId });

    dispatch(setRestaurants(restaurants));
  };
}

export function loadRestaurantDetail({ restaurantId }) {
  return async (dispatch) => {
    dispatch(setRestaurantDetail(null));

    const restaurantDetail = await fetchRestaurantDetail({
      restaurantId,
    });

    dispatch(setRestaurantDetail(restaurantDetail));
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const {
      restaurantsApp: {
        loginFields: { email, password },
      },
    } = getState();

    try {
      const accessToken = await postLogin({ email, password });

      dispatch(setAccessToken(accessToken));

      saveItem('accessToken', accessToken);
    } catch (error) {
      dispatch(changeLoginField({
        name: 'error',
        value: error.message,
      }));
    }
  };
}

export function loadReviews({ restaurantId }) {
  return async (dispatch) => {
    const { reviews } = await fetchRestaurantDetail({ restaurantId });

    dispatch(setReviews(reviews));
  };
}

export function sendReview({ restaurantId }) {
  return async (dispatch, getState) => {
    const {
      restaurantsApp: {
        accessToken,
        reviewFields: { score, description },
      },
    } = getState();

    await postReview({
      accessToken, restaurantId, score, description,
    });

    await dispatch(loadReviews({ restaurantId }));

    dispatch(clearReviewFields());
  };
}

export function deleteAccessToken() {
  return (dispatch) => {
    deleteItem('accessToken');

    dispatch(logout());
  };
}

export default reducer;
