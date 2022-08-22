import Form from './Form';
import Todos from './Todos';

export default function Page({
  inputText, onChangeInput, onSubmit,
  todos, onClickDeleteButton,
}) {
  return (
    <>
      <h1>To-do</h1>
      <Form
        inputText={inputText}
        onChangeInput={onChangeInput}
        onSubmit={onSubmit}
      />
      {todos.length === 0 ? <p>할 일이 없어요!</p>
        : <Todos todos={todos} onClickDeleteButton={onClickDeleteButton} />}
    </>
  );
}
