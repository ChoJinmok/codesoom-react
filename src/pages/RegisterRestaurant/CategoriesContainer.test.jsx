import { render } from '@testing-library/react';
import given from 'given2';

import { useSelector } from 'react-redux';

import CategoriesContainer from './CategoriesContainer';

jest.mock('react-redux');

describe('CategoriesContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    categories: given.categories,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('with restaurants list', () => {
    it('renders restaurants list', () => {
      given('categories', () => [
        {
          id: 1,
          name: '한식',
        },
      ]);

      const { getByText } = render((
        <CategoriesContainer />
      ));

      expect(getByText('한식')).not.toBeNull();
    });
  });
});
