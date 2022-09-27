import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

import {
  changeLoginField,
  requestLogin,
  deleteAccessToken,
} from '../restaurantsActions';

import { get } from '../utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password, error } = useSelector(get({
    page: 'restaurantsApp',
    key: 'loginFields',
  }));

  const accessToken = useSelector(get({
    page: 'restaurantsApp',
    key: 'accessToken',
  }));

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  function handleClick() {
    dispatch(deleteAccessToken());
  }

  return accessToken
    ? <LogoutForm onClick={handleClick} />
    : (
      <>
        <LoginForm
          fields={{ email, password }}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {error && <p>{error}</p>}
      </>
    );
}
