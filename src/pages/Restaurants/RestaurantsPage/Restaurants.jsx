// GET /restaurants -> collection
// GET /restaurants/1 -> element, member

export default function Restaurants({ restaurants, onClick }) {
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <a
            href={`/restaurants-app/restaurants/${restaurant.id}`}
            onClick={onClick(restaurant)}
          >
            {restaurant.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
