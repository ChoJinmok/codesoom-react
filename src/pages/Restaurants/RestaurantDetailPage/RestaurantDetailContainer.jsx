import { useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

import {
  loadRestaurantDetail,
  changeReviewField,
  sendReview,
} from '../slice';

import { get } from '../utils';

export default function RestaurantDetailContainer({ restaurantId }) {
  const restaurantDetail = useSelector(get({
    page: 'restaurantsApp',
    key: 'restaurantDetail',
  }));

  const accessToken = useSelector(get({
    page: 'restaurantsApp',
    key: 'accessToken',
  }));

  const reviewFields = useSelector(get({
    page: 'restaurantsApp',
    key: 'reviewFields',
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurantDetail({ restaurantId }));
  }, [restaurantId]);

  const handleChange = useCallback(({ name, value }) => {
    dispatch(changeReviewField({ name, value }));
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    dispatch(sendReview({ restaurantId }));
  }, [dispatch, restaurantId]);

  if (!restaurantDetail) return <h2>loading...</h2>;

  return (
    <>
      <RestaurantDetail restaurantDetail={restaurantDetail} />
      {accessToken
      && (
        <ReviewForm
          fields={reviewFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
      <Reviews reviews={restaurantDetail.reviews} />
    </>
  );
}
