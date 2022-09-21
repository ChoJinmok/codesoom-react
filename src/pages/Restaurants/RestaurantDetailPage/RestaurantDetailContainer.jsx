import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';

import {
  loadRestaurantDetail,
  changeReviewField,
} from '../restaurantsActions';

import { get } from '../utils';

export default function RestaurantDetailContainer({ restaurantId }) {
  const restaurantDetail = useSelector(get({
    page: 'restaurantsApp',
    key: 'restaurantDetail',
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurantDetail({ restaurantId }));
  }, [restaurantId]);

  function handleChange({ name, value }) {
    dispatch(changeReviewField({ name, value }));
  }

  if (!restaurantDetail) return <h2>loading...</h2>;

  return (
    <RestaurantDetail
      onChange={handleChange}
      restaurantDetail={restaurantDetail}
    />
  );
}
