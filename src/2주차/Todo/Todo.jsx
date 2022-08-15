export default function Todo({ todo: { id, content }, onClickDeleteButton }) {
  return (
    <li>
      <span>{content}</span>
      <button type="button" onClick={() => onClickDeleteButton(id)}>완료</button>
    </li>
  );
}
