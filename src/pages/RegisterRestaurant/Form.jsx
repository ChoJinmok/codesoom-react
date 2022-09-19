export default function Form({ restaurant, onChange, onSubmit }) {
  const { name, category, address } = restaurant;

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="이름"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="분류"
        name="category"
        value={category}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="주소"
        name="address"
        value={address}
        onChange={onChange}
      />
      <button type="submit">등록</button>
    </form>
  );
}
