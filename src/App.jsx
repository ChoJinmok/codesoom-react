import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CounterPage from './pages/Counter/App';
import TodosPage from './pages/Todos/TodosPage';
import RegisterRestaurantPage from './pages/RegisterRestaurant/RegisterRestaurantPage';
import RestaurantsApp from './pages/Restaurants/RestaurantsApp';
import NotFoundPage from './pages/NotFoundPage';

import RestaurantsHomePage from './pages/Restaurants/HomePage';
import AboutPage from './pages/Restaurants/AboutPage';
import LoginPage from './pages/Restaurants/LoginPage/LoginPage';
import RestaurantsPage from './pages/Restaurants/RestaurantsPage/RestaurantsPage';
import RestaurantDetailPage from './pages/Restaurants/RestaurantDetailPage/RestaurantDetailPage';

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
        <Route index element={<HomePage />} />
        <Route path="counter" element={<CounterPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="register-restaurant" element={<RegisterRestaurantPage />} />
        <Route path="restaurants-app" element={<RestaurantsApp />}>
          <Route index element={<RestaurantsHomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="restaurants">
            <Route index element={<RestaurantsPage />} />
            <Route path=":restaurantId" element={<RestaurantDetailPage />} />
          </Route>
        </Route>
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
