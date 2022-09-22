import { render, fireEvent } from '@testing-library/react';

import TextField from './TextField';

import { reviewFormcontrols as controls } from '../../../../fixtures/controls';

describe('TextField', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  function renderTextField({ label, type, name }) {
    return render(
      <TextField
        label={label}
        type={type}
        name={name}
        onChange={handleChange}
      />,
    );
  }

  context('with type', () => {
    it('renders label and input control', () => {
      const { queryByLabelText } = renderTextField({
        label: '평점',
        type: 'number',
        name: 'score',
      });

      expect(queryByLabelText('평점')).not.toBeNull();
    });

    it('renders \'text\'input control', () => {
      const { container } = renderTextField({
        label: '평점',
        type: 'number',
        name: 'score',
      });

      expect(container).toContainHTML('type="number"');
    });
  });

  context('without type', () => {
    it('renders label and input control', () => {
      const { queryByLabelText } = renderTextField({
        label: '리뷰 설명',
        name: 'description',
      });

      expect(queryByLabelText('리뷰 설명')).not.toBeNull();
    });

    it('renders \'text\'input control', () => {
      const { container } = renderTextField({
        label: '리뷰 설명"',
        name: 'description',
      });

      expect(container).toContainHTML('type="text"');
    });
  });

  controls.forEach(({ label, name, value }) => {
    it('listens change event', () => {
      const { getByLabelText } = renderTextField({ label, name });

      // not.toBeNull을 사용할 땐 query사용하는 것이 좋다(get은 없으면 그냥 에러가 나기 때문)
      fireEvent.change(getByLabelText(label), {
        target: { value },
      });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });
});
