import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import FormContainer from './FormContainer';

jest.mock('react-redux');

// App 자체가 화면에 보여주는 역할을 하지 않기 떄문에 기본적인 검사만
// 데이터를 내려주는 역할을 하기 때문에 데이터 관련된 테스트 진행하면 좋음

describe('FormContainer', () => {
  it('renders Page component', () => {
    useSelector.mockImplementation((selector) => selector({
      todosPage: {
        todoTitle: '',
      },
    }));
    const { getByText, getByPlaceholderText } = render(<FormContainer />);

    // 정규표현식
    expect(getByText(/추가/)).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');
  });

  it('renders Page component', () => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      todosPage: {
        todoTitle: 'New Title',
      },
    }));

    const { getByText, getByDisplayValue } = render(
      <FormContainer />,
    );

    expect(getByDisplayValue(/New Title/)).not.toBeNull();

    fireEvent.click(getByText(/추가/));

    expect(dispatch).toBeCalledWith({
      type: 'todos/addTodo',
    });
  });

  // it('renders complete button to listen to click event', () => {
  //   const {
  //     getByPlaceholderText, getByText, getAllByText, getAllByRole,
  //   } = render(<App />);

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
