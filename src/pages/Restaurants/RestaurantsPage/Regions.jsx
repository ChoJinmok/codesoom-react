import { memo } from 'react';

import MenuList from '../MenuList';
import MenuItem from '../MenuItem';

export default memo(({ regions, onClick, regionName }) => (
  <MenuList>
    {regions.map((region) => (
      <MenuItem
        key={region.id}
        active={region.name === regionName}
      >
        <button
          type="button"
          onClick={() => onClick({
            field: 'regionName',
            content: region.name,
          })}
        >
          {region.name}
        </button>
      </MenuItem>
    ))}
  </MenuList>
));
