export default function Form({ restaurant, onChange, onSubmit }) {
  const { name, category, address } = restaurant;

  return (
    <form onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="이름"
        value={name}
        onChange={onChange}
      />
      <input
        name="category"
        type="text"
        placeholder="분류"
        value={category}
        onChange={onChange}
      />
      <input
        name="address"
        type="text"
        placeholder="주소"
        value={address}
        onChange={onChange}
      />
      <button type="submit">등록</button>
    </form>
  );
}
