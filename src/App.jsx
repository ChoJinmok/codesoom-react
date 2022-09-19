import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CounterPage from './pages/Counter/App';
import TodosPage from './pages/Todos/TodosPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  // const { location: { pathname } } = window;

  // const MyComponent = {
  //   '/': HomePage,
  //   '/about': AboutPage,
  //   '/restaurants': RestaurantsPage,
  // }[pathname] || NotFoundPage;

  return (
    <>
      <header>
        <h1>
          <Link to="/">코드숨 11기</Link>
        </h1>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

  // if (pathname === '/') {
  //   return (
  //     <h1>Home</h1>
  //   );
  // }

  // return (
  //   <RestaurantsPage />
  // );
}
