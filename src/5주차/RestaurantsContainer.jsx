import { useSelector } from 'react-redux';

import Restaurants from './Restaurants';

import { get } from './utils';

export default function RestaurantsContainer() {
  const restaurants = useSelector(get('restaurants'));
  // const { restaurants } = useSelector((state) => ({
  //   restaurants: state.restaurants,
  // }));

  return (
    restaurants.length > 0 && <Restaurants restaurants={restaurants} />
  );
}
