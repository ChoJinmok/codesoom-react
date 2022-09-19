import { render } from '@testing-library/react';
import given from 'given2';

import { useDispatch, useSelector } from 'react-redux';

import RegisterRestaurantPage from './RegisterRestaurantPage';

import INITIALSTATE from '../../../fixtures/initialState';
import RETAURANTS from '../../../fixtures/restaurants';

jest.mock('react-redux');

describe('RegisterRestaurantPage', () => {
  given('state', () => ({
    registerRestaurant: {
      restaurant: given.restaurant,
      restaurants: given.restaurants,
      categories: [],
    },
  }));

  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector(given.state));

    useDispatch.mockImplementation(() => dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'Restaurant' & text box & button", () => {
    given('restaurant', () => INITIALSTATE.restaurant);
    given('restaurants', () => []);

    const { getByText, getByPlaceholderText } = render((
      <RegisterRestaurantPage />
    ));

    expect(getByText(/Restaurants/)).not.toBeNull();
    expect(getByPlaceholderText(/이름/)).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText(/분류/)).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText(/주소/)).toHaveAttribute('type', 'text');
    expect(getByText(/등록/)).not.toBeNull();

    expect(dispatch).toBeCalledTimes(2);
  });

  context('with restaurants list', () => {
    const state = {
      restaurants: RETAURANTS,
    };

    it('renders restaurants list', () => {
      given('restaurant', () => INITIALSTATE.restaurant);
      given('restaurants', () => state.restaurants);

      const { getAllByRole } = render((
        <RegisterRestaurantPage />
      ));

      state.restaurants.forEach((restaurant, index) => {
        expect(getAllByRole('listitem')[index].textContent)
          .toBe(`${restaurant.name} | ${restaurant.category} | ${restaurant.address}`);
      });
    });
  });

  context('without restaurant list', () => {
    it('renders no list', () => {
      given('restaurant', () => INITIALSTATE.restaurant);
      given('restaurants', () => []);

      const { queryByRole } = render((
        <RegisterRestaurantPage />
      ));

      expect(queryByRole('listitem')).toBeNull();
    });
  });
});
