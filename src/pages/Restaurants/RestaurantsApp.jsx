import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import RestaurantsPage from './RestaurantsPage';
import RestaurantDetailContainer from './RestaurantDetailContainer';

export default function RestaurantsApp() {
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
          <Link to="/restaurants-app">헤더</Link>
        </h1>
      </header>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="restaurants" element={<RestaurantsPage />} />
        <Route path="restaurants/:restaurantId" element={<RestaurantDetailContainer />} />
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
