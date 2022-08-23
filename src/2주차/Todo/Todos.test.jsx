import { render } from '@testing-library/react';

import Todos from './Todos';

describe('Todos component', () => {
  const handleClickDelete = jest.fn();

  const setup = (todos = []) => render(
    <Todos
      todos={todos}
      onClickDeleteButton={handleClickDelete}
    />,
  );

  const todos = [
    {
      id: 1,
      content: 'Task-1',
    },
    {
      id: 2,
      content: 'Task-2',
    },
    {
      id: 3,
      content: 'Task-3',
    },
  ];

  it('renders todos', () => {
    const { getByText } = setup(todos);

    todos.forEach((todo) => {
      expect(getByText(todo.content)).not.toBeNull();
    });
  });
});
