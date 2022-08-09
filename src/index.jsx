import React, { useState } from 'react';
import ReactDom from 'react-dom/client';

// 이전에는 React를 활용하지 않고 DOM객체를 직접 만들어서 사용
// React는 Virtual DOM을 만들어서 관리 -> ReactDOM이 그것을 참고 하여 그려줌
// 내부로직을 알필요는 없다. -> 일덩한 데이터(DOM tree)를 다루는 것으로 이해
// => 복잡한 과정들이 간단해짐

// element가 복잡해지면 따로 함수 빼서 만들어 준다.(분리가능) => 컴포넌트화 => 컴포넌트는 일반 HTML 태그처럼 사용가능
// 전체가 하나로 감싸져야됨
// 직접 reder함수를 만들어서 사용하기 보다는 선언적으로만 로직을 짜주면 리액트가 알라서 해줌 => setState를 활용해서 state가 변경되면 알아서 처리
// 그려줘 라는 명령은 따로 하지 않는다. setState로 state만 변경 -> 상태가 바뀌면 이렇게 될거야!
function Counter() {
  const [state, setState] = useState({
    count: 0,
  });

  const { count } = state;

  function handleClick() {
    setState({
      count: count + 1,
    });
  }

  return (
    <button type="button" onClick={handleClick}>
      Click me!
      (
      { count }
      )
    </button>
  );
}

// eslint-disable-next-line react/prop-types
function Button({ children }) {
  return (
    <button type="button">
      {children}
    </button>
  );
}

function Buttons() {
  return (
    <p>
      {[1, 2, 3].map((i) => (
        <Button key={i}>
          {i}
        </Button>
      ))}
    </p>
  );
}

// index.js가 기본 entry라서 index.js가 없으면 에러를 일으킴 -> webpack.config 수정
function App() {
  return (
    <div>
      <p>Hello, world!!!</p>
      <p>Hi!</p>
      <Counter />
      <Buttons />
    </div>
  );
}

// React가 만들어낸 element들은 직접 화면에 그릴 수 없다.
// -> React Dom을 이용해서 화면에 그려준다.
ReactDom.createRoot(document.getElementById('app')).render(<App />);

// renderButtons(); 처럼 함수를 실행하지 않고 눈에 보이는데로 적는 방식이 선언적 방식
// 관심사 분리 : 비즈니스 로직, 어떻게 보일지 선언하는 곳을 분리한다.
