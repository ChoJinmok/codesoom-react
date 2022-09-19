import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Restaurants from './Restaurants';

import { get } from './utils';

export default function RestaurantsContainer() {
  const navigate = useNavigate();

  const restaurants = useSelector(get({
    page: 'restaurantsApp',
    key: 'restaurants',
  }));
  // const { restaurants } = useSelector((state) => ({
  //   restaurants: state.restaurants,
  // }));

  function handleClickRestaurant(restaurant) {
    const url = `/restaurants-app/restaurants/${restaurant.id}`;
    navigate(url);
  }

  return (
    restaurants.length > 0 && (
      <Restaurants
        restaurants={restaurants}
        onClickRestaurant={handleClickRestaurant}
      />
    )
  );
}
