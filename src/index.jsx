import ReactDom from 'react-dom/client';

import { Provider } from 'react-redux';

// import CounterApp from './2주차/Counter/App';
import TodoApp from './2주차/Todo/App';

import store from './store';

// 이전에는 React를 활용하지 않고 DOM객체를 직접 만들어서 사용
// React는 Virtual DOM을 만들어서 관리 -> ReactDOM이 그것을 참고 하여 그려줌
// 내부로직을 알필요는 없다. -> 일덩한 데이터(DOM tree)를 다루는 것으로 이해
// => 복잡한 과정들이 간단해짐

// index.js가 기본 entry라서 index.js가 없으면 에러를 일으킴 -> webpack.config 수정

// React가 만들어낸 element들은 직접 화면에 그릴 수 없다.
// -> React Dom을 이용해서 화면에 그려준다.
// ReactDom.createRoot(document.getElementById('app')).render(<CounterApp />);
ReactDom.createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
);

// renderButtons(); 처럼 함수를 실행하지 않고 눈에 보이는데로 적는 방식이 선언적 방식
// 관심사 분리 : 비즈니스 로직, 어떻게 보일지 선언하는 곳을 분리한다.
