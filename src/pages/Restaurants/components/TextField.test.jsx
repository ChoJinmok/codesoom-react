import { render, fireEvent } from '@testing-library/react';

import TextField from './TextField';

import { reviewFormcontrols as controls } from '../../../../fixtures/controls';

describe('TextField', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  function renderTextField({
    label, type, name, value,
  }) {
    return render(
      <TextField
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />,
    );
  }

  it('renders label and input control', () => {
    const { getByLabelText } = renderTextField({
      label: '평점',
      value: '5',
    });

    expect(getByLabelText('평점').value).toBe('5');
  });

  context('with type', () => {
    it('renders setting input control', () => {
      const { container } = renderTextField({
        type: 'number',
      });

      expect(container).toContainHTML('type="number"');
    });
  });

  context('without type', () => {
    it('renders \'text\' input control', () => {
      const { container } = renderTextField({
        label: '평점',
      });

      expect(container).toContainHTML('type="text"');
    });
  });

  it('listens change event', () => {
    const { label, name, value } = controls[1];

    const { getByLabelText } = renderTextField({ label, name });

    fireEvent.change(getByLabelText(label), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});

// not.toBeNull을 사용할 땐 query사용하는 것이 좋다(get은 없으면 그냥 에러가 나기 때문)
