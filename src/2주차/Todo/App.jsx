import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Page from './Page';

export default function App() {
  const [state, setState] = useState({
    inputText: '',
    todos: [],
  });

  const { inputText, todos } = state;

  function handleChangeInput(e) {
    setState({
      ...state,
      inputText: e.target.value,
    });
  }

  // Todo : 혹시나 직접 구현할 때는 util파일 만들어서 관리!
  // function uuidv4() {
  // return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
  //   .replace(/[018]/g, (c) => ((c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> c / 4)
  //     .toString(16));
  // }

  function handleClickAddButton(e) {
    e.preventDefault();
    setState({
      inputText: '',
      todos: [
        ...todos,
        { id: uuidv4(), content: inputText },
      ],
    });
  }

  function handleClickDeleteButton(id) {
    setState({
      ...state,
      todos: todos.filter((todo) => todo.id !== id),
    });
  }

  return (
    <Page
      inputText={inputText}
      todos={todos}
      onChangeInput={handleChangeInput}
      onClickAddButton={handleClickAddButton}
      onClickDeleteButton={handleClickDeleteButton}
    />
  );
}
