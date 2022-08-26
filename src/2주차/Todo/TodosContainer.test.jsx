import { render, fireEvent } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import TodosContainer from './TodosContainer';

jest.mock('react-redux');

// App 자체가 화면에 보여주는 역할을 하지 않기 떄문에 기본적인 검사만
// 데이터를 내려주는 역할을 하기 때문에 데이터 관련된 테스트 진행하면 좋음

describe('TodosContainer', () => {
  // TODO: useSelector 조작
  // test를 위한 예제값 몰아줄 수 있음(실제 구현에 넣지 않아도)
  useSelector.mockImplementation((selector) => selector({
    todos: [],
  }));

  useDispatch.mockReturnValue(jest.fn());

  it('renders Page component', () => {
    const { getByText } = render(<TodosContainer />);

    expect(getByText('할 일이 없어요!')).not.toBeNull();
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
