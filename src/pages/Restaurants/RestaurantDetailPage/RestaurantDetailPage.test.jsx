import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetailPage from './RestaurantDetailPage';

import restaurantDetail from '../../../../fixtures/restaurantDetail';

jest.mock('react-redux');

test('RestaurantDetailContainer', () => {
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

  const params = { restaurantId: 1 };

  render(<RestaurantDetailPage params={params} />);
});
