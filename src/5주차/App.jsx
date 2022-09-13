import HomePage from './HomePage';
import RestaurantsPage from './RestaurantsPage';

function AboutPage() {
  return (
    <h1>About...</h1>
  );
}

function NotFoundPage() {
  return (
    <h1>404 Not Found</h1>
  );
}

export default function App() {
  const { location: { pathname } } = window;

  const MyComponent = {
    '/': HomePage,
    '/about': AboutPage,
    '/restaurants': RestaurantsPage,
  }[pathname] || NotFoundPage;

  return (
    <MyComponent />
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
