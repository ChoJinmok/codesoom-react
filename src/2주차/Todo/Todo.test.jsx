// jsx를 테스트하는 경우 jsx로 파일 만들어준다.
// React Testing Library : 리액트에 있는 컴포넌트를 테스트하기 위한 render를 제공(개발 모드로 설치)
// @testing-library/jest-dom : render의 결과물은 DOM형태로 나오고 DOM을 찾아서 사용할 수 있게 해준다.(matcher 확장)
import { render, fireEvent } from '@testing-library/react';

// toHaveTextContent 사용하려면 => 할 때 마다 import하면 불편 config파일에 설정해주면 된다.
// import '@testing-library/jest-dom';

import Todo from './Todo';

// 테스트 작성하는 방법
// describe - context(jest는 기본제공 안해줌, plug-in 따로 설치해야됨) - it
// given : 주어진 데이터들에대해

describe('Todo component', () => {
  const todo = {
    id: 1,
    content: '뭐라도 하기',
  };

  // jest에서는 function을 테스트 하기 좋은 함수가 준비돼있음
  const handleClickDeleteButton = jest.fn();

  // render의 결과 여러가지 얻을 수 있는데 그 중 container 확인
  // 완료 버튼 누르면 무슨 일이 일어나는지 확인 : getByText(text로 요소를 찾을 수 있다)
  const setup = () => render(
    <Todo
      todo={todo}
      onClickDeleteButton={handleClickDeleteButton}
    />,
  );

  it('renders todos & button', () => {
    const { container } = setup();

    expect(container).toHaveTextContent('뭐라도 하기');
    // --> 화면에 "뭐라도 하기"가 보여야한다.
    expect(container).toHaveTextContent('완료');
  });

  it('renders button to listen to click event', () => {
    const { getByText } = setup();

    expect(handleClickDeleteButton).not.toBeCalled();

    // fireEvent : 이벤트를 실제로 일으켜봄
    fireEvent.click(getByText('완료'));

    // with를 넣어주면 어떤 인자와 함께 불려졌는지 알 수 있다.
    expect(handleClickDeleteButton).toBeCalledWith(1);
  });
});
