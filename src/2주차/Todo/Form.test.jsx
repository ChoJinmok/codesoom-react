import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const setup = (props = {}) => {
  const utils = render(<Input {...props} />);
  const input = utils.getByPlaceholderText('할 일을 입력해 주세요');
  const button = utils.getByText('추가');
  return {
    input,
    button,
    ...utils,
  };
};

describe('Input component', () => {
  context('When Input render', () => {
    it('Has input', () => {
      const { input } = setup();
      expect(input).toBeTruthy();
    });

    it('Input element has text type', () => {
      const { input } = setup();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('Has button', () => {
      const { button } = setup();
      expect(button).toBeTruthy();
    });
  });

  context('When input change', () => {
    const handleChange = jest.fn();
    const text = '코드숨 리액트 11기 화이팅!';

    it('Not yet handleChange is called', () => {
      setup({ onChange: handleChange });

      expect(handleChange).not.toBeCalled();
    });

    it('handleChange is called', () => {
      const { input } = setup({ onChange: handleChange });

      fireEvent.change(input, { target: { value: text } });

      expect(handleChange).toBeCalled();
    });

    it('Input element value is set', () => {
      const { input } = setup({ onChange: handleChange });

      fireEvent.change(input, { target: { value: text } });

      expect(input.value).toBe(text);
    });
  });

  context('When add button click', () => {
    function deleteInputValue() {
      document.querySelector('input').value = '';
    }
    const handleClick = jest.fn(() => deleteInputValue());
    const text = '코드숨 리액트 11기 화이팅!';

    it('Not yet handleClick is called', () => {
      setup({ onClick: handleClick });

      expect(handleClick).not.toBeCalled();
    });

    it('handleClick is called', () => {
      const { input, button } = setup({ onClick: handleClick });

      fireEvent.change(input, { target: { value: text } });
      fireEvent.click(button);

      expect(handleClick).toBeCalled();
    });

    it('Is empty input value after clicking add button', () => {
      const { input, button } = setup({ onClick: handleClick });

      fireEvent.change(input, { target: { value: text } });
      fireEvent.click(button);

      expect(input.value).toBe('');
    });
  });
});
