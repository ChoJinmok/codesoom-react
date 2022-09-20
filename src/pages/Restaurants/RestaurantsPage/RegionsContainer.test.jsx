import { render, fireEvent } from '@testing-library/react';

import { useSelector } from 'react-redux';

import RegionsContainer from './RegionsContainer';

import regions from '../../../../fixtures/regions';

jest.mock('react-redux');

describe('RegionsContainer', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      restaurantsApp: {
        regions,
        filter: {
          regionName: null,
        },
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders regions', () => {
    const { container } = render((
      <RegionsContainer onClick={handleClick} />
    ));

    regions.forEach(({ name }) => {
      expect(container).toHaveTextContent(name);
    });
  });

  it('renders button to listent to click event', () => {
    const { getAllByRole } = render((
      <RegionsContainer onClick={handleClick} />
    ));

    const regionButtons = getAllByRole('button');

    regionButtons.forEach((regionButton) => {
      fireEvent.click(regionButton);

      expect(handleClick).toBeCalledWith({
        field: 'regionName',
        content: regionButton.textContent,
      });
    });
  });
});
