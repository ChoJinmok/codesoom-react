import { render } from '@testing-library/react';
import given from 'given2';

import { useSelector } from 'react-redux';

import ListContainer from './ListContainer';

import RESTAURANTS from '../../../fixtures/restaurants';

jest.mock('react-redux');

describe('ListContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    registerRestaurant: {
      restaurants: given.restaurants,
    },
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('with restaurants list', () => {
    const state = {
      restaurants: RESTAURANTS,
    };

    it('renders restaurants list', () => {
      given('restaurants', () => state.restaurants);

      const { getAllByRole } = render((
        <ListContainer />
      ));

      state.restaurants.forEach((restaurant, index) => {
        expect(getAllByRole('listitem')[index].textContent)
          .toBe(`${restaurant.name} | ${restaurant.category} | ${restaurant.address}`);
      });
    });
  });
});
