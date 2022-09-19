import { useSelector } from 'react-redux';

import List from './List';

export default function ListContainer() {
  const { restaurants } = useSelector(({ registerRestaurant }) => ({
    restaurants: registerRestaurant.restaurants,
  }));

  return (
    <ul>
      {restaurants.map((restaurant) => (
        <List key={restaurant.id} restaurant={restaurant} />
      ))}
    </ul>
  );
}
