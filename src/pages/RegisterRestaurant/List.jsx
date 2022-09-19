export default function List({ restaurant }) {
  return (
    <li>
      {`${restaurant.name} | ${restaurant.category} | ${restaurant.address}`}
    </li>
  );
}
