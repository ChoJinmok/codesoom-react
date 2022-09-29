import React from 'react';

import MenuItems from './MenuItems';

function RestaurantDetail({
  restaurantDetail: {
    name,
    address,
    menuItems,
  },
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
    </>
  );
}

export default React.memo(RestaurantDetail);
