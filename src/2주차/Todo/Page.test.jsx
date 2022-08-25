import { render } from '@testing-library/react';

import Page from './Page';

// test('테스트 #1')
// decribe - it => describe('List') => it('renders todoss') List가 it으로 넘어간다.
// describe - context - it
// jest- plugins => jest-plugin-context
//
// with tasks
// - List renders tasks...
// - List renders "완료" button to delete a task
// without tasks
// - List render no tasks message
//
// TDD cycle: Red - Green - Refactoring
// Refactoring에서 반복 제거 (eg. render함수가 반복된다)

describe('Page component', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  // 항상 사용법 먼저 작성하기!
  const setup = ({ todoTitle = '', todos = [] } = {}) => render(
    <Page
      todoTitle={todoTitle}
      onChangeInput={handleChangeTitle}
      onClickAddButton={handleClickAddTask}
      todos={todos}
      onClickDeleteButton={handleClickDeleteTask}
    />,
  );

  it('renders To-do & Input component', () => {
    const { getByPlaceholderText, getByText } = setup({ todoTitle: 'Task-example' });

    expect(getByText('To-do')).not.toBeNull();
    expect(getByText('추가')).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('Task-example');
  });

  context('without todos', () => {
    it('renders no todo message', () => {
      const { getByText } = setup();

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });

  context('with todos', () => {
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

    it('renders Todos component', () => {
      const { getByText } = setup({ todos });

      todos.forEach((todo) => {
        expect(getByText(todo.content)).not.toBeNull();
      });
    });
  });
});
