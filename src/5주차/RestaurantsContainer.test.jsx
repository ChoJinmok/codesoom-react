import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import RestaurantsContainer from './RestaurantsContainer';

import restaurants from '../fixtures/restaurants';

jest.mock('react-redux');

describe('RestaurantsContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders restaurants', () => {
    useSelector.mockImplementation((selector) => selector({
      restaurants,
    }));

    const { getAllByRole } = render((
      <RestaurantsContainer />
    ));

    restaurants.forEach((restaurant, index) => {
      expect(getAllByRole('listitem')[index].textContent).toBe(restaurant.name);
    });
  });
});
