// useDispatch : action을 보낸다.
// useSelector : 상태를 얻을 수 있게 해준다.
import { useDispatch, useSelector } from 'react-redux';

import Form from './Form';

import {
  updateTodoTitle,
  addTodo,
} from './todosActions';

export default function Page() {
  // selector : 어떤 것에서 state를 골라내는 것
  const { todoTitle } = useSelector(({ todosPage }) => ({
    todoTitle: todosPage.todoTitle,
  }));

  const dispatch = useDispatch();

  function handleChangeInput(event) {
    dispatch(updateTodoTitle(event.target.value));
    // dispatch({
    //   type: 'updateTodoTitle',
    //   payload: {
    //     todoTitle: event.target.value,
    //   },
    // });
  }

  // Todo : 혹시나 직접 구현할 때는 util파일 만들어서 관리!
  // function uuidv4() {
  // return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
  //   .replace(/[018]/g, (c) => ((c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> c / 4)
  //     .toString(16));
  // }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addTodo());
  }

  return (
    <Form
      todoTitle={todoTitle}
      onChangeInput={handleChangeInput}
      onSubmit={handleSubmit}
    />
  );
}
