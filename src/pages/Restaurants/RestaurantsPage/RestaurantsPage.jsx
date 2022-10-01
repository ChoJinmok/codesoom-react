import { useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import RegionsContainer from './RegionsContainer';
import CategoriesContainer from './CategoriesContainer';
import RestaurantsContainer from './RestaurantsContainer';

import {
  loadRestaurantInformations,
  loadRestaurants,
  applyFilter,
} from '../slice';

import { get } from '../utils';

export default function RestaurantsPage() {
  const navigate = useNavigate();

  const filter = useSelector(get({
    page: 'restaurantsApp',
    key: 'filter',
  }));
  // const filter = useSelector((state) => state.filter);
  // const { filter } = useSelector((state) => ({
  //   filter: state.filter,
  // }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurantInformations('regions'));
    dispatch(loadRestaurantInformations('categories'));
  }, []);

  useEffect(() => {
    if (!(filter.regionName && filter.categoryId)) return;

    dispatch(loadRestaurants());
  }, [filter]);

  const handleClickInformation = useCallback(({ field, content }) => {
    dispatch(applyFilter({ field, content }));
  }, [dispatch]);

  const handleClickRestaurant = useCallback((restaurant) => {
    const url = `/restaurants-app/restaurants/${restaurant.id}`;

    navigate(url);
  }, [navigate]);

  return (
    <>
      <RegionsContainer onClick={handleClickInformation} />
      <CategoriesContainer onClick={handleClickInformation} />
      <RestaurantsContainer onClick={handleClickRestaurant} />
    </>
  );
}
