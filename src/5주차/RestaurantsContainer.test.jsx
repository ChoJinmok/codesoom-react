import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

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
      <MemoryRouter>
        <RestaurantsContainer />
      </MemoryRouter>
    ));

    const restaurantLinks = getAllByRole('link');

    restaurantLinks.forEach((restaurantLink, index) => {
      expect(restaurantLink).toHaveTextContent(restaurants[index]);
    });
  });
});
