import { render, fireEvent } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import TodosPage from './TodosPage';

jest.mock('react-redux');

// TodosPage 자체가 화면에 보여주는 역할을 하지 않기 떄문에 기본적인 검사만
// 데이터를 내려주는 역할을 하기 때문에 데이터 관련된 테스트 진행하면 좋음

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

// TODO: useSelector 조작
// test를 위한 예제값 몰아줄 수 있음(실제 구현에 넣지 않아도)
function stubSelector(todoTitle, todos) {
  useSelector.mockImplementation((selector) => selector({
    todosPage: {
      todoTitle,
      todos,
    },
  }));
}

describe('TodosPage component', () => {
  useDispatch.mockReturnValue(jest.fn());

  it('renders Page component', () => {
    stubSelector('Task-example', []);

    const { getByText, getByDisplayValue } = render(<TodosPage />);

    expect(getByText('To-do')).not.toBeNull();
    // 정규표현식
    expect(getByText(/추가/)).not.toBeNull();
    expect(getByDisplayValue(/Task-example/)).toHaveAttribute('type', 'text');
    expect(getByText('할 일이 없어요!')).not.toBeNull();
  });

  context('without todos', () => {
    stubSelector('', []);
    it('renders no todo message', () => {
      const { getByText } = render(<TodosPage />);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });

  context('with todos', () => {
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

    it('renders Todos component', () => {
      stubSelector('', todos);
      const { getByText } = render(<TodosPage />);

      todos.forEach((todo) => {
        expect(getByText(todo.title)).not.toBeNull();
      });
    });
  });

  // it('renders input to listen to change event', () => {
  //   stubSelector('화이팅', []);
  //   const { getByPlaceholderText } = render(<TodosPage />);

  //   const text = '코드숨 리액트 11기 화이팅!';

  //   fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: text } });

  //   expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(text);
  // });

  // it('renders add button to listen to click event', () => {
  //   const { getByPlaceholderText, getByText } = render(<TodosPage />);

  //   const todos = ['Todo-1', 'Todo-2', 'Todo-3'];

  //   todos.forEach((todo) => {
  //     fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: todo } });
  //     fireEvent.click(getByText('추가'));

  //     // expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
  //     expect(getByText(todo)).not.toBeNull();
  //   });
  // });

  // it('renders complete button to listen to click event', () => {
  //   const {
  //     getByPlaceholderText, getByText, getAllByText, getAllByRole,
  //   } = render(<TodosPage />);

  //   const todos = ['Todo-1', 'Todo-2', 'Todo-3'];

  //   todos.forEach((todo) => {
  //     fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: todo } });
  //     fireEvent.click(getByText('추가'));
  //   });

  //   const completeButtons = getAllByText('완료');

  //   fireEvent.click(completeButtons[0]);

  //   expect(getAllByRole('listitem')).toHaveLength(2);
  // });

  // TODO: integration 테스트에 해당하는 통합 테스트
  // CodeceptJS => 실제 브라우저에서 사용자 테스트 실행 가능
  // jest로는 기본적인 테스트만 실행
});
