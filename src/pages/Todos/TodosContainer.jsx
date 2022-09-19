// useDispatch : action을 보낸다.
// useSelector : 상태를 얻을 수 있게 해준다.
import { useDispatch, useSelector } from 'react-redux';

import Todos from './Todos';

import {
  deleteTodo,
} from './todosActions';

export default function TodosContainer() {
  // selector : 어떤 것에서 state를 골라내는 것
  const { todos } = useSelector(({ todosPage }) => ({
    todos: todosPage.todos,
  }));

  const dispatch = useDispatch();

  function handleClickDeleteButton(id) {
    dispatch(deleteTodo(id));
  }

  return (
    todos.length === 0
      ? <p>할 일이 없어요!</p>
      : (
        <Todos
          todos={todos}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )
  );
}
