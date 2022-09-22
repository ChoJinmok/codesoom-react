export default function TextField({
  label, type = 'text', name, onChange,
}) {
  const id = `input${name}`;

  function handleChange({ target: { value } }) {
    onChange({ name, value });
  }

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
}
