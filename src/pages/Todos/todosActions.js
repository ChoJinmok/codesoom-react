// action creator

export function updateTodoTitle(todoTitle) {
  return {
    type: 'todos/updateTodoTitle',
    payload: {
      todoTitle,
    },
  };
}

export function addTodo() {
  return {
    type: 'todos/addTodo',
  };
}

export function deleteTodo(id) {
  return {
    type: 'todos/deleteTodo',
    payload: {
      id,
    },
  };
}
