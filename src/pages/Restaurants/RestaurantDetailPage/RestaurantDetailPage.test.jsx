import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetailPage from './RestaurantDetailPage';

import restaurantDetail from '../../../../fixtures/restaurantDetail';

jest.mock('react-redux');

describe('RestaurantPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurantsApp: {
        accessToken: 'ACCESS_TOKEN',
        restaurantDetail,
        reviewFields: {
          score: '',
          description: '',
        },
      },
    }));
  });

  context('with params props', () => {
    it('renders name', () => {
      const params = { restaurantId: 1 };

      const { container } = render(<RestaurantDetailPage params={params} />);

      expect(container).toHaveTextContent(restaurantDetail.name);
    });
  });

  context('without params props', () => {
    it('renders name', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/restaurants/1']}>
          <RestaurantDetailPage />
        </MemoryRouter>,
      );

      expect(container).toHaveTextContent(restaurantDetail.name);
    });
  });
});
