import { useSelector } from 'react-redux';

import Restaurants from './Restaurants';

import { get } from '../utils';

export default function RestaurantsContainer({ onClick }) {
  const restaurants = useSelector(get({
    page: 'restaurantsApp',
    key: 'restaurants',
  }));
  // const { restaurants } = useSelector((state) => ({
  //   restaurants: state.restaurants,
  // }));

  function handleClick(restaurant) {
    return (event) => {
      event.preventDefault();

      onClick(restaurant);
    };
  }

  return (
    restaurants.length > 0 && (
      <Restaurants
        restaurants={restaurants}
        onClick={handleClick}
      />
    )
  );
}
