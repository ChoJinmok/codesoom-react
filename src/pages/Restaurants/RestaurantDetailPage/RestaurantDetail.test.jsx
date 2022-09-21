import { render, fireEvent } from '@testing-library/react';

import RestaurantDetail from './RestaurantDetail';

import restaurantDetail from '../../../../fixtures/restaurantDetail';
import reviewFields from '../../../../fixtures/reviewFields';

describe('RestaurantDetail', () => {
  it('rendes restaurant details', () => {
    const { container } = render(
      <RestaurantDetail
        restaurantDetail={restaurantDetail}
      />,
    );

    expect(container).toHaveTextContent(restaurantDetail.name);
    expect(container).toHaveTextContent('주소:');
    expect(container).toHaveTextContent(restaurantDetail.address);
    expect(container).toHaveTextContent(/메뉴/);
  });

  it('renders review write form', () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <RestaurantDetail
        restaurantDetail={restaurantDetail}
        onChange={handleChange}
      />,
    );

    const { score, description } = reviewFields;

    // not.toBeNull을 사용할 땐 query사용하는 것이 좋다(get은 없으면 그냥 에러가 나기 때문)
    fireEvent.change(getByLabelText('평점'), {
      target: { value: score },
    });

    expect(handleChange).toBeCalledWith({
      name: 'score',
      value: score,
    });

    fireEvent.change(getByLabelText('리뷰 내용'), {
      target: { value: description },
    });

    expect(handleChange).toBeCalledWith({
      name: 'description',
      value: description,
    });
  });
});
