import ReactDOM from 'react-dom';

import {
  BrowserRouter,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './App';

import store from './store';

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app'),
);

// 다양한 페이지가 연결이 되는 걸 확인하고 싶을 때 BrowserRouter를 index에 연결
// Router를 직접적으로 조작을 해주기 위해서 BrowserRouter를 index로 옮긴다.
