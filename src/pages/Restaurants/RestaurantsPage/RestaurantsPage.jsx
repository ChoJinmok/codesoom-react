import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import RegionsContainer from './RegionsContainer';
import CategoriesContainer from './CategoriesContainer';
import RestaurantsContainer from './RestaurantsContainer';

import {
  loadRestaurantInformations,
  loadRestaurants,
  applyFilter,
} from '../restaurantsActions';

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

  function handleClickInformation({ field, content }) {
    dispatch(applyFilter({ field, content }));
  }

  function handleClickRestaurant(restaurant) {
    const url = `/restaurants-app/restaurants/${restaurant.id}`;

    navigate(url);
  }

  return (
    <>
      <RegionsContainer onClick={handleClickInformation} />
      <CategoriesContainer onClick={handleClickInformation} />
      <RestaurantsContainer onClick={handleClickRestaurant} />
    </>
  );
}
