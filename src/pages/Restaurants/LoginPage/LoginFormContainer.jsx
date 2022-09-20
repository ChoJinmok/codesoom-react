import { useDispatch } from 'react-redux';

import LoginForm from './LoginForm';

import { requestLogin } from '../restaurantsActions';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  function handleChange({ name, value }) {

  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  return (
    <LoginForm
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
