import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetailContainer from './RestaurantDetailContainer';

import restaurantDetail from '../../../../fixtures/restaurantDetail';
import { reviewFormcontrols as controls } from '../../../../fixtures/controls';

jest.mock('react-redux');

describe('RestaurantDetailContainer', () => {
  const dispatch = jest.fn();

  function renderRestaurantContainer() {
    return render(
      <RestaurantDetailContainer
        restaurantId={restaurantDetail.id}
      />,
    );
  }

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurantsApp: {
        accessToken: given.accessToken,
        restaurantDetail: given.restaurantDetail,
        reviewFields: {
          score: '',
          description: '',
        },
      },
    }));
  });

  afterEach(() => {
    // jest.clearAllMocks();
    dispatch.mockClear();
  });

  context('when data is not loading yet', () => {
    given('restaurantDetail', () => null);

    it('renders \'loading...\'', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('loading...');
    });
  });

  context('when data is loading', () => {
    given('restaurantDetail', () => restaurantDetail);

    it('loads restaurant detail from API', () => {
      renderRestaurantContainer();

      expect(dispatch).toBeCalledTimes(1);
    });

    it('renders restaurant details', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent(restaurantDetail.name);
      expect(container).toHaveTextContent(restaurantDetail.address);
      expect(container).toHaveTextContent('리뷰');
    });

    context('without logged-in', () => {
      it('doesn\'t render review write fields', () => {
        const { queryByLabelText } = renderRestaurantContainer();

        expect(queryByLabelText('평점')).toBeNull();
        expect(queryByLabelText('리뷰 내용')).toBeNull();
      });
    });

    context('with logged-in', () => {
      given('accessToken', () => 'ACCESS_TOKEN');

      it('renders review write fields to listen to change event', () => {
        const { getByLabelText } = renderRestaurantContainer();

        controls.forEach(({ label, name, value }) => {
          fireEvent.change(getByLabelText(label), {
            target: { value },
          });

          expect(dispatch).toBeCalledWith({
            type: 'restaurants/changeReviewField',
            payload: { name, value },
          });
        });
      });

      it('renders \'리뷰 남기기\' button', () => {
        const { getByText } = renderRestaurantContainer();

        fireEvent.click(getByText('리뷰 남기기'));

        // 더 정확하게 테스트하고 싶으면 mock store활용
        expect(dispatch).toBeCalledTimes(2);
      });
    });
  });
});
