import { render, fireEvent } from '@testing-library/react';

import Form from './Form';

import fixtureInitialState from './fixtures/initialState';
import fixtureInformations from './fixtures/informations';

describe('Form', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  function renderForm(information = fixtureInitialState.information) {
    return (render(
      <Form
        information={information}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    ));
  }

  it('renders text box & button', () => {
    const { getByText, getByPlaceholderText } = renderForm();

    expect(getByPlaceholderText('이름')).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText('분류')).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText('주소')).toHaveAttribute('type', 'text');
    expect(getByText('등록')).not.toBeNull();
  });

  it('renders input to listen to change event', () => {
    const { getAllByRole } = renderForm();

    const inputs = getAllByRole('textbox');

    expect(handleChange).not.toBeCalled();

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: Object.values(fixtureInformations)[index] } });

      expect(handleChange).toBeCalled();
    });
  });

  it('renders button to listen to submit event', () => {
    const { getByRole } = renderForm(fixtureInformations);

    expect(handleSubmit).not.toBeCalled();

    fireEvent.click(getByRole('button'));

    expect(handleSubmit).toBeCalled();
  });
});
