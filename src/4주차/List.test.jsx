import { render } from '@testing-library/react';

import List from './List';

import fixtureRestaurants from '../fixtures/restaurants';

describe('List', () => {
  it('renders restaurant', () => {
    const { getByRole } = render((
      <List restaurant={fixtureRestaurants} />
    ));

    expect(getByRole('listitem').textContent)
      .toBe(`${fixtureRestaurants.name} | ${fixtureRestaurants.category} | ${fixtureRestaurants.address}`);
  });
});
