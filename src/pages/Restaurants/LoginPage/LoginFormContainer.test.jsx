import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

import loginFields from '../../../../fixtures/loginFields';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    // 어떤 테스트가 먼저 실행되는지는 임의로 결정 -> dipatch를 정리해주는게 좋다
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurantsApp: {
        accessToken: given.accessToken,
        loginFields,
      },
    }));
  });

  context('when logged out', () => {
    given('accessToken', () => '');

    it('renders input controls', () => {
      const { getByLabelText } = render(<LoginFormContainer />);

      expect(getByLabelText('E-mail').value).toBe(loginFields.email);
      expect(getByLabelText('Password').value).toBe(loginFields.password);
    });

    it('listens chage events', () => {
      const { getByLabelText } = render(<LoginFormContainer />);

      fireEvent.change(getByLabelText('E-mail'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'restaurants/changeLoginField',
        payload: {
          name: 'email',
          value: 'new email',
        },
      });
    });

    it('renders \'Log In\' button to listen to submit event', () => {
      const { getByText } = render(<LoginFormContainer />);

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
      // requestLogin 함수는 새로 만들어져서 전달되기 떄문에 비교하기 어려움
      // 실제로 확인하고 싶으면 mock store 라이브러리 활용해야함
    });
  });

  context('when logged in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    it('renders \'Log out\' button to listen to click event', () => {
      const { getByText } = render(<LoginFormContainer />);

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalledWith({ type: 'restaurants/logout' });
    });
  });
});
