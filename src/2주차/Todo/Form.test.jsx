import { render, fireEvent } from '@testing-library/react';

import Input from './Form';

describe('Input component', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const setup = (text = '') => render(
    <Input
      inputText={text}
      onChangeInput={handleChange}
      onSubmit={handleSubmit}
    />,
  );

  const text = '코드숨 리액트 11기 화이팅!';

  it('renders input & button', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByText('추가')).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');
  });

  it('renders input to listen to change event', () => {
    const { getByPlaceholderText } = setup();

    expect(handleChange).not.toBeCalled();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: text } });

    expect(handleChange).toBeCalled();
  });

  it('renders input set value', () => {
    const { getByDisplayValue } = setup(text);

    expect(getByDisplayValue(text)).not.toBeNull();
  });

  it('renders Form to listen to submit event', () => {
    const { getByText } = setup();

    expect(handleSubmit).not.toBeCalled();

    fireEvent.submit(getByText('추가'));

    expect(handleSubmit).toBeCalled();
  });
});
