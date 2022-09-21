import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetailContainer from './RestaurantDetailContainer';

import restaurantDetail from '../../../../fixtures/restaurantDetail';
import reviewFields from '../../../../fixtures/reviewFields';

jest.mock('react-redux');

describe('RestaurantDetailContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const restaurantId = restaurantDetail.id;

  context('when data is not loading yet', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        restaurantsApp: {
          restaurantDetail: null,
        },
      }));
    });

    it('renders \'loading...\'', () => {
      const { container } = render(
        <RestaurantDetailContainer
          restaurantId={restaurantId}
        />,
      );

      expect(container).toHaveTextContent('loading...');
    });
  });

  context('when data is loading', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        restaurantsApp: {
          restaurantDetail,
        },
      }));
    });

    it('loads restaurant detail from API', () => {
      render(
        <RestaurantDetailContainer
          restaurantId={restaurantId}
        />,
      );

      expect(dispatch).toBeCalled();
    });
  });

  it('renders review write form', () => {
    const { queryByLabelText } = render(
      <RestaurantDetailContainer
        restaurantId={restaurantId}
      />,
    );

    expect(queryByLabelText('평점')).not.toBeNull();
    expect(queryByLabelText('리뷰 내용')).not.toBeNull();
  });

  it('listents change events', () => {
    const { getByLabelText } = render(
      <RestaurantDetailContainer
        restaurantId={restaurantId}
      />,
    );

    const { score, description } = reviewFields;

    fireEvent.change(getByLabelText('평점'), {
      target: { value: score },
    });

    expect(dispatch).toBeCalledWith({
      type: 'restaurants/changeReviewField',
      payload: { name: 'score', value: score },
    });

    fireEvent.change(getByLabelText('리뷰 내용'), {
      target: { value: description },
    });

    expect(dispatch).toBeCalledWith({
      type: 'restaurants/changeReviewField',
      payload: { name: 'description', value: description },
    });
  });
});
