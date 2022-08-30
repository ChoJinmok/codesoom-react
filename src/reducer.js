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

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  const { todoTitle, todos } = state;
  const { type, payload } = action;

  const index = {
    updateTodoTitle: () => ({
      ...state,
      taskTitle: payload.todoTitle,
    }),

    addTodo: () => {
      if (!todoTitle) return state;

      return {
        todoTitle: '',
        todos: [
          ...todos,
          { id: uuidv4(), title: todoTitle },
        ],
      };
    },

    deleteTodo: () => ({
      ...state,
      todos: todos.filter((todo) => todo.id !== payload.id),
    }),

    default: () => state,
  };

  return (index[type] || index.default)();
}
