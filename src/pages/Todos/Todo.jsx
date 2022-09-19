export default function Todo({ todo: { id, title }, onClickDeleteButton }) {
  return (
    <li>
      <span>{title}</span>
      <button type="button" onClick={() => onClickDeleteButton(id)}>완료</button>
    </li>
  );
}
