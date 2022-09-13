import RestaurantsPage from './RestaurantsPage';

function HomePage() {
  return (
    <h1>Home</h1>
  );
}

export default function App() {
  const { location: { pathname } } = window;

  const MyComponent = {
    '/': HomePage,
    '/retaurants': RestaurantsPage,
  }[pathname];

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
