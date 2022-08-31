import { render } from '@testing-library/react';
import given from 'given2';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import fixtureInitialState from '../fixtures/initialState';
import fixtureRestaurants from '../fixtures/restaurants';

jest.mock('react-redux');

describe('App', () => {
  given('state', () => ({
    restaurant: given.restaurant,
    restaurants: given.restaurants,
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
    given('restaurant', () => fixtureInitialState.restaurant);
    given('restaurants', () => []);

    const { getByText, getByPlaceholderText } = render((
      <App />
    ));

    expect(getByText(/Restaurants/)).not.toBeNull();
    expect(getByPlaceholderText(/이름/)).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText(/분류/)).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText(/주소/)).toHaveAttribute('type', 'text');
    expect(getByText(/등록/)).not.toBeNull();

    expect(dispatch).toBeCalledWith({
      type: 'setRestaurants',
      payload: {
        restaurants: fixtureRestaurants,
      },
    });
  });

  context('with restaurants list', () => {
    const state = {
      restaurants: fixtureRestaurants,
    };

    it('renders restaurants list', () => {
      given('restaurant', () => fixtureInitialState.restaurant);
      given('restaurants', () => state.restaurants);

      const { getAllByRole } = render((
        <App />
      ));

      state.restaurants.forEach((restaurant, index) => {
        expect(getAllByRole('listitem')[index].textContent)
          .toBe(`${restaurant.name} | ${restaurant.category} | ${restaurant.address}`);
      });
    });
  });

  context('without restaurant list', () => {
    it('renders no list', () => {
      given('restaurant', () => fixtureInitialState.restaurant);
      given('restaurants', () => []);

      const { queryByRole } = render((
        <App />
      ));

      expect(queryByRole('listitem')).toBeNull();
    });
  });
});
