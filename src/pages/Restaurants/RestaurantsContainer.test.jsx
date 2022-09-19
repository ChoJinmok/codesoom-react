import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import RestaurantsContainer from './RestaurantsContainer';

import restaurants from '../fixtures/restaurants';

jest.mock('react-redux');

describe('RestaurantsContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders restaurants', () => {
    useSelector.mockImplementation((selector) => selector({
      restaurants,
    }));

    // Page Component까지는 MemoryRouter 사용해주는게 괜찮을 수 있지만 Container Compoent 부터는 좀 과하다고 생각할 수 있다.
    // 2가지 방법
    //  1. onClick에대해서 움직이게
    //  2. 컴포넌트를 내려주기

    // 방법 2
    // const Link = ({ children }) => (<>{children}</>);
    // <RestaurantsContainer Link={Link} />

    // 아샬님은 방법 1을 가장 선호 아래에 나오는 방법

    const handleClick = jest.fn();

    const { getAllByRole } = render((
      <RestaurantsContainer onClickRestaurant={handleClick} />
    ));

    const restaurantLinks = getAllByRole('link');

    restaurantLinks.forEach((restaurantLink, index) => {
      expect(restaurantLink).toHaveTextContent(restaurants[index]);
      expect(restaurantLink.href).toContain(`restaurants/${restaurants[index].id}`);
    });

    // 이런식으로 링크가 있는지 확인 가능함
    // expect(container.innerHTML).toContain('<a href="')
  });
});
