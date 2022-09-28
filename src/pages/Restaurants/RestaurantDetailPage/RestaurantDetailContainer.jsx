import { useEffect } from 'react';

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

  function handleChange({ name, value }) {
    dispatch(changeReviewField({ name, value }));
  }

  function handleSubmit() {
    dispatch(sendReview({ restaurantId }));
  }

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
