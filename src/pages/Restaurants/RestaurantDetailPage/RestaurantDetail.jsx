import { memo } from 'react';

import MenuItems from './MenuItems';

export default memo(({
  restaurantDetail: {
    name,
    address,
    menuItems,
  },
}) => (
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
));
