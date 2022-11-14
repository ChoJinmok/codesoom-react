import { memo } from 'react';

export default memo(({ count, onClickButton }) => {
  function handleClick() {
    return () => onClickButton(1);
  }

  return (
    <button type="button" onClick={handleClick()}>
      Click me!
      (
      { count }
      )
    </button>
  );
});
