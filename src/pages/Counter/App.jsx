import { useState } from 'react';

import CounterPage from './Page';

// element가 복잡해지면 따로 함수 빼서 만들어 준다.(분리가능) => 컴포넌트화 => 컴포넌트는 일반 HTML 태그처럼 사용가능
// 전체가 하나로 감싸져야됨
// 직접 reder함수를 만들어서 사용하기 보다는 선언적으로만 로직을 짜주면 리액트가 알라서 해줌 => setState를 활용해서 state가 변경되면 알아서 처리
// 그려줘 라는 명령은 따로 하지 않는다. setState로 state만 변경 -> 상태가 바뀌면 이렇게 될거야!

// 화면에 그려주는 애들만 모아 놓는다.

export default function CounterApp() {
  // 상태만 관리하는 것만 모아놓는다. => 심지어 더 나눌 수 있으면 좋다 => 리액트를 사용하는 이유(UI와 비즈니스로직 분리) => 오래가는 프로그램(유지보수 용의)
  const [count, setCount] = useState(0);

  // 증가값인 경우 increment라는 이름 사용!
  function handleClickButton(increment) {
    setCount(count + increment);
  }

  return (
    <CounterPage
      count={count}
      // eslint-disable-next-line react/jsx-no-bind
      onClickButton={handleClickButton}
    />
  );
}
