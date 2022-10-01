import { memo } from 'react';

// GET /restaurants -> collection
// GET /restaurants/1 -> element, member

export default memo(({ restaurants, onClick }) => {
  function handleClick(restaurant) {
    return (event) => {
      event.preventDefault();

      onClick(restaurant);
    };
  }

  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <a
            href={`/restaurants-app/restaurants/${restaurant.id}`}
            onClick={handleClick(restaurant)}
          >
            {restaurant.name}
          </a>
        </li>
      ))}
    </ul>
  );
});
