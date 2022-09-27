import { fireEvent, render } from '@testing-library/react';
import given from 'given2';

import { useSelector, useDispatch } from 'react-redux';

import FormContainer from './FormContainer';

import { registerRestaurantInitialState as INITIALSTATE } from '../../../fixtures/initialState';
import NEW_RESTAURANT from '../../../fixtures/newRestaurant';

jest.mock('react-redux');

describe('FormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      registerRestaurant: {
        restaurant: given.restaurant,
      },
    }));

    useDispatch.mockImplementation(() => dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders text box & button', () => {
    given('restaurant', () => NEW_RESTAURANT);

    const { getByText, getByDisplayValue } = render((
      <FormContainer />
    ));

    expect(getByDisplayValue('New Name')).toHaveAttribute('type', 'text');
    expect(getByDisplayValue('New Category')).toHaveAttribute('type', 'text');
    expect(getByDisplayValue('New Address')).toHaveAttribute('type', 'text');
    expect(getByText('등록')).not.toBeNull();
  });

  it('renders input to listen to change event', () => {
    given('restaurant', () => INITIALSTATE.restaurant);

    const { getAllByRole } = render((
      <FormContainer />
    ));

    const inputs = getAllByRole('textbox');

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: Object.values(NEW_RESTAURANT)[index] } });

      expect(dispatch).toBeCalledWith({
        type: 'registerRestaurant/updateRestaurantField',
        payload: {
          sort: Object.keys(NEW_RESTAURANT)[index],
          content: Object.values(NEW_RESTAURANT)[index],
        },
      });
    });
  });

  it('renders button to listen to submit event', () => {
    given('restaurant', () => NEW_RESTAURANT);

    const { getByRole } = render((
      <FormContainer />
    ));

    fireEvent.click(getByRole('button'));

    expect(dispatch).toBeCalledWith({
      type: 'registerRestaurant/addRestaurant',
    });
  });
});
