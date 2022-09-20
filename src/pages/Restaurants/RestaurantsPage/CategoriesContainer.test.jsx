import { render, fireEvent } from '@testing-library/react';

import { useSelector } from 'react-redux';

import CategoriesContainer from './CategoriesContainer';

import categories from '../../../../fixtures/categories';

jest.mock('react-redux');

describe('CategoriesContainer', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      restaurantsApp: {
        categories,
        filter: {
          categoryId: null,
        },
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders categories', () => {
    const { container } = render((
      <CategoriesContainer onClick={handleClick} />
    ));

    categories.forEach(({ name }) => {
      expect(container).toHaveTextContent(name);
    });
  });

  it('renders button to listent to click event', () => {
    const { getAllByRole } = render((
      <CategoriesContainer onClick={handleClick} />
    ));

    const categoriesButtons = getAllByRole('button');

    categories.forEach((category, index) => {
      fireEvent.click(categoriesButtons[index]);

      expect(handleClick).toBeCalledWith({
        field: 'categoryId',
        content: category.id,
      });
    });
  });
});
