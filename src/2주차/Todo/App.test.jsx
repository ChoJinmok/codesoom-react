import { render, fireEvent } from '@testing-library/react';

import App from './App';

// App 자체가 화면에 보여주는 역할을 하지 않기 떄문에 기본적인 검사만
// 데이터를 내려주는 역할을 하기 때문에 데이터 관련된 테스트 진행하면 좋음

describe('App component', () => {
  it('renders Page component', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText('To-do')).not.toBeNull();
    // 정규표현식
    expect(getByText(/추가/)).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');
    expect(getByText('할 일이 없어요!')).not.toBeNull();
  });

  it('renders input to listen to change event', () => {
    const { getByPlaceholderText } = render(<App />);

    const text = '코드숨 리액트 11기 화이팅!';

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: text } });

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(text);
  });

  it('renders add button to listen to click event', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const tasks = ['Task-1', 'Task-2', 'Task-3'];

    tasks.forEach((task) => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: task } });
      fireEvent.click(getByText('추가'));

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
      expect(getByText(task)).not.toBeNull();
    });
  });

  it('renders delete button to listen to click event', () => {
    const {
      getByPlaceholderText, getByText, getAllByText, getAllByRole,
    } = render(<App />);

    const tasks = ['Task-1', 'Task-2', 'Task-3'];

    tasks.forEach((task) => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: task } });
      fireEvent.click(getByText('추가'));
    });

    const sut = getAllByText('완료');

    fireEvent.click(sut[0]);

    expect(getAllByRole('listitem')).toHaveLength(2);
  });

  // TODO: integration 테스트에 해당하는 통합 테스트
  // CodeceptJS => 실제 브라우저에서 사용자 테스트 실행 가능
  // jest로는 기본적인 테스트만 실행
});
