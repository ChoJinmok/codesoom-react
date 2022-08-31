import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FormContainer from './FormContainer';
import ListContainer from './ListContainer';

import {
  setRestaurants,
} from './actions';

import fixturesRestaurants from '../fixtures/restaurants';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRestaurants(fixturesRestaurants));
  }, []);

  return (
    <>
      <h1>Restaurants</h1>
      <ListContainer />
      <FormContainer />
    </>
  );
}
