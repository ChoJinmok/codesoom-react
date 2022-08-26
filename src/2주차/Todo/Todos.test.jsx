import { render } from '@testing-library/react';

import Todos from './Todos';

describe('Todos component', () => {
  const handleClickDelete = jest.fn();

  // 항상 사용법 먼저 작성하기!
  const setup = (todos = []) => render(
    <Todos
      todos={todos}
      onClickDeleteButton={handleClickDelete}
    />,
  );

  const todos = [
    {
      id: 1,
      title: 'Task-1',
    },
    {
      id: 2,
      title: 'Task-2',
    },
    {
      id: 3,
      title: 'Task-3',
    },
  ];

  it('renders todos', () => {
    const { getByText } = setup(todos);

    todos.forEach((todo) => {
      expect(getByText(todo.title)).not.toBeNull();
    });
  });
});
