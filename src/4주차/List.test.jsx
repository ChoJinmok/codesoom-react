import { render } from '@testing-library/react';

import List from './List';

import fixtureRestaurant from './fixtures/restaurant';

describe('List', () => {
  it('renders restaurant', () => {
    const { getByRole } = render((
      <List restaurant={fixtureRestaurant} />
    ));

    expect(getByRole('listitem').textContent)
      .toBe(`${fixtureRestaurant.name} | ${fixtureRestaurant.classification} | ${fixtureRestaurant.address}`);
  });
});
