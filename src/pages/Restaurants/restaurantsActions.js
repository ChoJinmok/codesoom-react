import {
  fetchRestaurantInformations,
  fetchRestaurants,
  fetchRestaurantDetail,
  postLogin,
  postReview,
} from '../../services/api';

import { saveItem } from '../../services/storage';

export function setRestaurantInformations({ sort, data }) {
  return {
    type: 'restaurants/setRestaurantInformations',
    payload: {
      sort,
      data,
    },
  };
}

export function loadRestaurantInformations(sort) {
  return async (dispatch) => {
    const data = await fetchRestaurantInformations(sort);

    dispatch(setRestaurantInformations({
      sort,
      data,
    }));
  };
}

export function applyFilter({ field, content }) {
  return {
    type: 'restaurants/applyFilter',
    payload: {
      field,
      content,
    },
  };
}

export function setRestaurants(restaurants) {
  return {
    type: 'restaurants/setRestaurants',
    payload: {
      restaurants,
    },
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

export function setRestaurantDetail(restaurantDetail) {
  return {
    type: 'restaurants/setRestaurantDetail',
    payload: { restaurantDetail },
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

export function changeLoginField({ name, value }) {
  return {
    type: 'restaurants/changeLoginField',
    payload: { name, value },
  };
}

export function setAccessToken(accessToken) {
  return {
    type: 'restaurants/setAccessToken',
    payload: { accessToken },
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

export function logout() {
  return {
    type: 'restaurants/logout',
  };
}

export function changeReviewField({ name, value }) {
  return {
    type: 'restaurants/changeReviewField',
    payload: { name, value },
  };
}

export function clearReviewFields() {
  return {
    type: 'restaurants/clearReviewFields',
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
