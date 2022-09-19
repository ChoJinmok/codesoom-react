import { render, fireEvent } from '@testing-library/react';

import Form from './Form';

import INITIALSTATE from '../../../fixtures/initialState';
import NEW_RESTAURANT from '../../../fixtures/newRestaurant';

describe('Form', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn((event) => event.preventDefault());

  function renderForm(restaurant = INITIALSTATE.restaurant) {
    return (render(
      <Form
        restaurant={restaurant}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    ));
  }

  it('renders text box & button', () => {
    const { getByText, getByDisplayValue } = renderForm(NEW_RESTAURANT);

    expect(getByDisplayValue('New Name')).toHaveAttribute('type', 'text');
    expect(getByDisplayValue('New Category')).toHaveAttribute('type', 'text');
    expect(getByDisplayValue('New Address')).toHaveAttribute('type', 'text');
    expect(getByText(/등록/)).not.toBeNull();
  });

  it('renders input to listen to change event', () => {
    const { getAllByRole } = renderForm();

    const inputs = getAllByRole('textbox');

    expect(handleChange).not.toBeCalled();

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: Object.values(NEW_RESTAURANT)[index] } });

      expect(handleChange).toBeCalled();
    });
  });

  it('renders button to listen to submit event', () => {
    const { getByRole } = renderForm(NEW_RESTAURANT);

    expect(handleSubmit).not.toBeCalled();

    fireEvent.click(getByRole('button'));

    expect(handleSubmit).toBeCalled();
  });
});
