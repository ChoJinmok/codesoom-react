import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import RestaurantDetail from './RestaurantDetail';

import { loadRestaurantDetail } from './restaurantsActions';

import { get } from './utils';

export default function RestaurantDetailContainer() {
  const restaurantDetail = useSelector(get({
    page: 'restaurantsApp',
    key: 'restaurantDetail',
  }));

  const dispatch = useDispatch();

  const { restaurantId } = useParams();

  useEffect(() => {
    dispatch(loadRestaurantDetail({ restaurantId }));
  }, [restaurantId]);

  if (!restaurantDetail) return <h2>loading...</h2>;

  return (
    <RestaurantDetail
      restaurantDetail={restaurantDetail}
    />
  );
}
