import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

import {
  changeLoginField,
  requestLogin,
  deleteAccessToken,
} from '../slice';

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

  const handleChange = useCallback(({ name, value }) => {
    dispatch(changeLoginField({ name, value }));
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    dispatch(requestLogin());
  }, [dispatch]);

  const handleClick = useCallback(() => {
    dispatch(deleteAccessToken());
  }, [dispatch]);

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
