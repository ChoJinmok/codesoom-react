import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import RestaurantsApp from './RestaurantsApp';

import { loadItem } from '../../services/storage';

import regions from '../../../fixtures/regions';
import categories from '../../../fixtures/categories';
import restaurants from '../../../fixtures/restaurants';
import restaurantDetail from '../../../fixtures/restaurantDetail';

jest.mock('react-redux');
jest.mock('../../services/storage');

describe('RestaurantsApp', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      restaurantsApp: {
        accessToken: '',
        regions,
        categories,
        restaurants,
        filter: given.filter,
        restaurantDetail,
        loginFields: {
          email: '',
          password: '',
          error: '',
        },
        reviewFields: {
          score: '',
          description: '',
        },
      },
    }));

    useDispatch.mockImplementation(() => dispatch);

    given('storage', () => ({ accessToken: given.accessToken }));

    loadItem.mockImplementation((key) => given.storage[key]);
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  function renderApp({ path } = {}) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <RestaurantsApp />
      </MemoryRouter>
    ));
  }

  it('renders \'헤더\'', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('EatGo');
  });

  context('with path /', () => {
    it('reders the home page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Home');
    });
  });

  context('with path /about', () => {
    it('reders the about page', () => {
      const { container } = renderApp({ path: '/about' });

      expect(container).toHaveTextContent('About 페이지 입니다.');
    });
  });

  context('with path /restaurants', () => {
    given('filter', () => ({
      regionName: '',
      categoryId: '',
    }));

    it('reders the restaurants page', () => {
      const { getByText } = renderApp({ path: '/restaurants' });

      regions.forEach((region) => {
        expect(getByText(region.name)).not.toBeNull();
      });

      categories.forEach((category) => {
        expect(getByText(category.name)).not.toBeNull();
      });

      restaurants.forEach((restaurant) => {
        expect(getByText(restaurant.name)).not.toBeNull();
      });
    });
  });

  context('with path /restaurants/id', () => {
    it('reders the restaurant detail page', () => {
      const { getByText } = renderApp({ path: '/restaurants/1' });

      expect(getByText(restaurantDetail.name)).not.toBeNull();
    });
  });

  context('with path /login', () => {
    it('renders the login page', () => {
      const { container } = renderApp({ path: '/login' });

      expect(container).toHaveTextContent('Log In');
    });
  });

  context('when logged out', () => {
    given('accessToken', () => '');

    it('doesn\'t call dispatch', () => {
      renderApp();

      expect(dispatch).not.toBeCalled();
    });
  });

  context('when logged in', () => {
    const accessToken = 'ACCESS_TOKEN';

    given('accessToken', () => accessToken);

    it('calls dispatch with \'setAccessToken\' action', () => {
      renderApp();

      expect(dispatch).toBeCalledWith({
        type: 'restaurantsApp/setAccessToken',
        payload: accessToken,
      });
    });
  });

  // context('with invalid path', () => {
  //   it('reders the not found page', () => {
  //     const { container } = renderApp({ path: '/xxx' });

  //     expect(container).toHaveTextContent('404 Not Found');
  //   });
  // });

  // context('without filter field at least one', () => {
  //   given('filter', () => ({
  //     regionName: null,
  //     categoryId: null,
  //   }));

  // it('loads regions & categories from API', () => {
  //   render((
  //     <MemoryRouter>
  //       <RestaurantsApp />
  //     </MemoryRouter>
  //   ));

  //   expect(dispatch).toBeCalledTimes(2);
  // });

  // it('renders regions', () => {
  //   const { getByText } = render((
  //     <MemoryRouter>
  //       <RestaurantsApp />
  //     </MemoryRouter>
  //   ));

  //   regions.forEach((region) => {
  //     expect(getByText(region.name)).not.toBeNull();
  //   });
  // });

  // it('renders region button to listent to click event', () => {
  //   const { getByText } = render((
  //     <MemoryRouter>
  //       <RestaurantsApp />
  //     </MemoryRouter>
  //   ));

  //   regions.forEach((region) => {
  //     fireEvent.click(getByText(region.name));

  //     expect(dispatch).toBeCalledWith({
  //       type: 'applyFilter',
  //       payload: {
  //         field: 'regionName',
  //         content: region.name,
  //       },
  //     });
  //   });
  // });

  // it('renders Categories', () => {
  //   const { getByText } = render((
  //     <MemoryRouter>
  //       <RestaurantsApp />
  //     </MemoryRouter>
  //   ));

  //   categories.forEach((category) => {
  //     expect(getByText(category.name)).not.toBeNull();
  //   });
  // });

  // it('renders category button to listent to click event', () => {
  //   const { getByText } = render((
  //     <MemoryRouter>
  //       <RestaurantsApp />
  //     </MemoryRouter>
  //   ));

  //   categories.forEach((category) => {
  //     fireEvent.click(getByText(category.name));

  //     expect(dispatch).toBeCalledWith({
  //       type: 'applyFilter',
  //       payload: {
  //         field: 'categoryId',
  //         content: category.id,
  //       },
  //     });
  //   });
  // });

  //   it('renders Restaurants', () => {
  //     const { getByText } = render((
  //       <MemoryRouter>
  //         <RestaurantsApp />
  //       </MemoryRouter>
  //     ));

  //     restaurants.forEach((restaurant) => {
  //       expect(getByText(restaurant.name)).not.toBeNull();
  //     });
  //   });
  // });

  // context('with full filter field', () => {
  //   given('filter', () => ({
  //     regionName: regions[0].name,
  //     categoryId: categories[0].id,
  //   }));

  //   it('loads restaurants from API', () => {
  //     render((
  //       <MemoryRouter>
  //         <RestaurantsApp />
  //       </MemoryRouter>
  //     ));

  //     expect(dispatch).toBeCalledTimes(3);
  //   });
  // });
});
