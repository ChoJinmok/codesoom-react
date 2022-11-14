import { render, fireEvent } from '@testing-library/react';

import ClickMe from './ClickMe';

describe('ClickMe', () => {
  const handleClick = jest.fn();
  const count = 0;

  const clickMeButtonTextContent = `Click me! (${count})`;

  function renderClickMeButton() {
    return render(
      <ClickMe
        count={count}
        onClickButton={handleClick}
      />,
    );
  }

  it('renders \'click me\' button', () => {
    const { queryByRole, container } = renderClickMeButton();

    const clickMeButton = queryByRole('button');

    expect(clickMeButton).not.toBeNull();
    expect(container).toHaveTextContent(clickMeButtonTextContent);
  });

  it('listens click evnet', () => {
    const { getByText } = renderClickMeButton();

    const clickMeButton = getByText(clickMeButtonTextContent);

    fireEvent.click(clickMeButton);

    expect(handleClick).toBeCalledWith(1);
  });
});
