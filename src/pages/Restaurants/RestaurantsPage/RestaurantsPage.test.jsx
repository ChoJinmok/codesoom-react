import { useNavigate, MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import given from 'given2';

import { useSelector, useDispatch } from 'react-redux';

import RestaurantsPage from './RestaurantsPage';

import regions from '../../../../fixtures/regions';
import categories from '../../../../fixtures/categories';
import restaurants from '../../../../fixtures/restaurants';

jest.mock('react-redux');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('RestaurantsPage', () => {
  given('state', () => ({
    regions,
    categories,
    restaurants,
    filter: given.filter,
  }));

  const dispatch = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({ restaurantsApp: given.state }));

    useDispatch.mockImplementation(() => dispatch);

    useNavigate.mockImplementation(() => navigate);
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

  describe('Containers', () => {
    given('filter', () => ({
      regionName: null,
      categoryId: null,
    }));

    it('renders regions', () => {
      const { getByText } = renderRestaurantsPage();

      regions.forEach(({ name }) => {
        expect(getByText(name)).not.toBeNull();
      });
    });

    it('renders region button to listent to click event', () => {
      const { getByText } = renderRestaurantsPage();

      regions.forEach(({ name }) => {
        fireEvent.click(getByText(name));

        expect(dispatch).toBeCalledWith({
          type: 'restaurants/applyFilter',
          payload: {
            field: 'regionName',
            content: name,
          },
        });
      });
    });

    it('renders Categories', () => {
      const { getByText } = renderRestaurantsPage();

      categories.forEach(({ name }) => {
        expect(getByText(name)).not.toBeNull();
      });
    });

    it('renders category button to listent to click event', () => {
      const { getByText } = renderRestaurantsPage();

      categories.forEach(({ id, name }) => {
        fireEvent.click(getByText(name));

        expect(dispatch).toBeCalledWith({
          type: 'restaurants/applyFilter',
          payload: {
            field: 'categoryId',
            content: id,
          },
        });
      });
    });

    it('renders Restaurants', () => {
      const { getByText } = renderRestaurantsPage();

      restaurants.forEach(({ name }) => {
        expect(getByText(name)).not.toBeNull();
      });
    });

    it('renders links to listent to click event', () => {
      const { getAllByRole } = renderRestaurantsPage();

      const restaurantLinks = getAllByRole('link');

      fireEvent.click(restaurantLinks[0]);

      expect(navigate).toBeCalled();
    });
  });

  context('without filter field at least one', () => {
    given('filter', () => ({
      regionName: null,
      categoryId: null,
    }));

    it('loads regions & categories from API', () => {
      renderRestaurantsPage();

      expect(dispatch).toBeCalledTimes(2);
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
