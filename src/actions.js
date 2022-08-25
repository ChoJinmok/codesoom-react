// action creator

export function updateTodoTitle(todoTitle) {
  return {
    type: 'updateTodoTitle',
    payload: {
      todoTitle,
    },
  };
}

export function addTodo() {
  return {
    type: 'addTodo',
  };
}

export function deleteTodo(id) {
  return {
    type: 'deleteTodo',
    payload: {
      id,
    },
  };
}
