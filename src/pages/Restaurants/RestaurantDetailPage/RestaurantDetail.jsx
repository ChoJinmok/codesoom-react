import ReviewForm from './ReviewForm';

import MenuItems from './MenuItems';

export default function RestaurantDetail({
  restaurantDetail: {
    name,
    address,
    menuItems,
  },
  onChange,
}) {
  return (
    <>
      <h2>{name}</h2>
      <p>
        주소:
        {' '}
        {address}
      </p>
      <h3>메뉴</h3>
      <MenuItems menuItems={menuItems} />
      <ReviewForm onChange={onChange} />
    </>
  );
}
