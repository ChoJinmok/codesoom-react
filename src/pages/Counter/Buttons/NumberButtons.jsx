import { memo } from 'react';

import NumberButton from './NumberButton';

export default memo(({ onClickButton }) => (
  <div>
    {[1, 2, 3, 4, 5].map((number) => (
      <NumberButton key={number} onClickButton={onClickButton}>
        {number}
      </NumberButton>
    ))}
  </div>
));
