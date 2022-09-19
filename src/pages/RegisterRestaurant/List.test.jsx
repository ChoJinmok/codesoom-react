import { render } from '@testing-library/react';

import List from './List';

import RESTAURANTS from '../../../fixtures/restaurants';

describe('List', () => {
  it('renders restaurant', () => {
    const { getByRole } = render((
      <List restaurant={RESTAURANTS} />
    ));

    expect(getByRole('listitem').textContent)
      .toBe(`${RESTAURANTS.name} | ${RESTAURANTS.category} | ${RESTAURANTS.address}`);
  });
});
