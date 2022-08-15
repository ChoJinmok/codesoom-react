import Form from './Form';
import Todos from './Todos';

export default function Page({
  inputText, onChangeInput, onClickAddButton,
  todos, onClickDeleteButton,
}) {
  return (
    <>
      <h1>To-do</h1>
      <Form
        inputText={inputText}
        onChangeInput={onChangeInput}
        onClickAddButton={onClickAddButton}
      />
      {todos.length === 0 ? <p>할 일이 없어요!</p>
        : <Todos todos={todos} onClickDeleteButton={onClickDeleteButton} />}
    </>
  );
}
