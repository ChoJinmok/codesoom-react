import { createStore } from 'redux';

import { v4 as uuidv4 } from 'uuid';

// Redux action
// - 필수
//  - type (string)
// - 두가지 방법 중 택 1
//  - 자기 마음대로 적는 방법 (ex. todoTitle 이라고 직접 적어놓음)
//  - payload (object) => { todoTitle }

const initialState = {
  todoTitle: '',
  todos: [],
};

function reducer(state = initialState, action) {
  if (action.type === 'updateTodoTitle') {
    return {
      ...state,
      todoTitle: action.payload.todoTitle,
    };
  }

  if (action.type === 'addTodo') {
    const { todoTitle, todos } = state;

    return {
      todoTitle: '',
      todos: [
        ...todos,
        { id: uuidv4(), content: todoTitle },
      ],
    };
  }

  if (action.type === 'deleteTodo') {
    const { todos } = state;

    return {
      ...state,
      todos: todos.filter((todo) => todo.id !== action.payload.id),
    };
  }

  return state;
}

const store = createStore(reducer);

export default store;
