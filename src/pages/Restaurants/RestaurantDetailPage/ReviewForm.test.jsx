import { render, fireEvent } from '@testing-library/react';

import ReviewForm from './ReviewForm';

import { reviewFormcontrols as controls } from '../../../../fixtures/controls';

describe('ReviewForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  function renderReviewForm() {
    return render(
      <ReviewForm
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    );
  }

  it('renders review write fields', () => {
    const { queryByLabelText } = renderReviewForm();

    expect(queryByLabelText('평점')).not.toBeNull();
    expect(queryByLabelText('리뷰 내용')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByLabelText } = renderReviewForm();

    controls.forEach(({ label, name, value }) => {
      // not.toBeNull을 사용할 땐 query사용하는 것이 좋다(get은 없으면 그냥 에러가 나기 때문)
      fireEvent.change(getByLabelText(label), {
        target: { value },
      });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('renders \'Send\' button', () => {
    const { getByText } = renderReviewForm();

    fireEvent.click(getByText('리뷰 남기기'));

    expect(handleSubmit).toBeCalled();
  });
});
