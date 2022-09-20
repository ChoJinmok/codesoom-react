export default function LoginForm({ onChange, onSubmit }) {
  function handleChange() {
    return ({ target: { name, value } }) => {
      onChange({ name, value });
    };
  }

  function handleSubmit() {
    return (event) => {
      event.preventDefault();

      onSubmit();
    };
  }

  return (
    <form onSubmit={handleSubmit()}>
      <div>
        <label htmlFor="login-email">
          E-mail
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          onChange={handleChange()}
        />
      </div>
      <div>
        <label htmlFor="login-password">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          name="password"
          onChange={handleChange()}
        />
      </div>
      <button type="submit">
        Log In
      </button>
    </form>
  );
}
