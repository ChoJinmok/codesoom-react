import { render, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    // 어떤 테스트가 먼저 실행되는지는 임의로 결정 -> dipatch를 정리해주는게 좋다
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders input controls', () => {
    const { getByLabelText } = render(<LoginFormContainer />);

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
  });

  it('renders \'Log In\' button', () => {
    const { getByText } = render(<LoginFormContainer />);

    fireEvent.click(getByText('Log In'));

    expect(dispatch).toBeCalled();
    // requestLogin 함수는 새로 만들어져서 전달되기 떄문에 비교하기 어려움
    // 실제로 확인하고 싶으면 mock store 라이브러리 활용해야함
  });
});
