export default function Form({ todoTitle, onChangeInput, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={todoTitle} placeholder="할 일을 입력해 주세요" onChange={onChangeInput} />
      <button type="submit">추가</button>
    </form>
  );
}
