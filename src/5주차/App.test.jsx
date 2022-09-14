import { render, fireEvent } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import given from 'given2';

import { useSelector, useDispatch } from 'react-redux';

import App from './App';

import regions from '../fixtures/regions';
import categories from '../fixtures/categories';
import restaurants from '../fixtures/restaurants';

jest.mock('react-redux');

describe('App', () => {
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

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('with path /', () => {
    it('reders the home page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Home');
    });
  });

  context('with path /about', () => {
    it('reders the about page', () => {
      const { container } = renderApp({ path: '/about' });

      expect(container).toHaveTextContent('20명에게 추천');
    });
  });

  context('with path /restaurants', () => {
    it('reders the restaurants page', () => {
      const { container } = renderApp({ path: '/restaurants' });

      expect(container).toHaveTextContent('서울');
    });
  });

  context('with invalid path', () => {
    it('reders the not found page', () => {
      const { container } = renderApp({ path: '/xxx' });

      expect(container).toHaveTextContent('Not Found');
    });
  });

  context('without filter field at least one', () => {
    given('filter', () => ({
      regionName: null,
      categoryId: null,
    }));

    it('loads regions & categories from API', () => {
      render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

      expect(dispatch).toBeCalledTimes(2);
    });

    it('renders regions', () => {
      const { getByText } = render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

      regions.forEach((region) => {
        expect(getByText(region.name)).not.toBeNull();
      });
    });

    it('renders region button to listent to click event', () => {
      const { getByText } = render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

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
      const { getByText } = render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

      categories.forEach((category) => {
        expect(getByText(category.name)).not.toBeNull();
      });
    });

    it('renders category button to listent to click event', () => {
      const { getByText } = render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

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
      const { getByText } = render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

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
      render((
        <MemoryRouter>
          <App />
        </MemoryRouter>
      ));

      expect(dispatch).toBeCalledTimes(3);
    });
  });
});
