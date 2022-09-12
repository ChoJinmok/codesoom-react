import RestaurantsPage from './RestaurantsPage';

export default function App() {
  const { location: { pathname } } = window;

  const MyComponent = RestaurantsPage;

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
