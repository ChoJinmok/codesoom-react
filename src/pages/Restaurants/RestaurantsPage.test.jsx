import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import given from 'given2';

import { useSelector, useDispatch } from 'react-redux';

import RestaurantsPage from './RestaurantsPage';

import regions from '../fixtures/regions';
import categories from '../fixtures/categories';
import restaurants from '../fixtures/restaurants';

jest.mock('react-redux');

describe('RestaurantsPage', () => {
  given('state', () => ({
    regions,
    categories,
    restaurants,
    filter: given.filter,
  }));

  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector(given.state));

    useDispatch.mockImplementation(() => dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderRestaurantsPage() {
    return render((
      <MemoryRouter>
        <RestaurantsPage />
      </MemoryRouter>
    ));
  }

  context('without filter field at least one', () => {
    given('filter', () => ({
      regionName: null,
      categoryId: null,
    }));

    it('loads regions & categories from API', () => {
      renderRestaurantsPage();

      expect(dispatch).toBeCalledTimes(2);
    });

    it('renders regions', () => {
      const { getByText } = renderRestaurantsPage();

      regions.forEach((region) => {
        expect(getByText(region.name)).not.toBeNull();
      });
    });

    it('renders region button to listent to click event', () => {
      const { getByText } = renderRestaurantsPage();

      regions.forEach((region) => {
        fireEvent.click(getByText(region.name));

        expect(dispatch).toBeCalledWith({
          type: 'applyFilter',
          payload: {
            field: 'regionName',
            content: region.name,
          },
        });
      });
    });

    it('renders Categories', () => {
      const { getByText } = renderRestaurantsPage();

      categories.forEach((category) => {
        expect(getByText(category.name)).not.toBeNull();
      });
    });

    it('renders category button to listent to click event', () => {
      const { getByText } = renderRestaurantsPage();

      categories.forEach((category) => {
        fireEvent.click(getByText(category.name));

        expect(dispatch).toBeCalledWith({
          type: 'applyFilter',
          payload: {
            field: 'categoryId',
            content: category.id,
          },
        });
      });
    });

    it('renders Restaurants', () => {
      const { getByText } = renderRestaurantsPage();

      restaurants.forEach((restaurant) => {
        expect(getByText(restaurant.name)).not.toBeNull();
      });
    });
  });

  context('with full filter field', () => {
    given('filter', () => ({
      regionName: regions[0].name,
      categoryId: categories[0].id,
    }));

    it('loads restaurants from API', () => {
      renderRestaurantsPage();

      expect(dispatch).toBeCalledTimes(3);
    });
  });
});
