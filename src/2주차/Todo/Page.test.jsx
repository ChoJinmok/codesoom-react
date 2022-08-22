import { render } from '@testing-library/react';
import context from 'jest-plugin-context';

import Page from './Page';

describe('Page component', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const setup = ({ taskTitle = '', todos = [] } = {}) => render(
    <Page
      inputText={taskTitle}
      onChangeInput={handleChangeTitle}
      onClickAddButton={handleClickAddTask}
      todos={todos}
      onClickDeleteButton={handleClickDeleteTask}
    />,
  );

  it('renders To-do & Input component', () => {
    const { getByPlaceholderText, getByText } = setup({ taskTitle: 'Task-example' });

    expect(getByText('To-do')).not.toBeNull();
    expect(getByText('추가')).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('Task-example');
  });

  context('When tasks is empty', () => {
    it('renders List component', () => {
      const { getByText } = setup();

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });
  });

  context('When todos exist', () => {
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

    it('renders List component', () => {
      const { getByText } = setup({ todos });

      todos.forEach((todo) => {
        expect(getByText(todo.content)).not.toBeNull();
      });
    });
  });
});
