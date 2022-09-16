import { Link } from 'react-router-dom';

export default function Restaurants({ restaurants }) {
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <Link to={`/restaurants/${restaurant.id}`}>
            {restaurant.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
