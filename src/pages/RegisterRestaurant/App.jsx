import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesContainer from './CategoriesContainer';
import FormContainer from './FormContainer';
import ListContainer from './ListContainer';

import {
  setRestaurants,
  setCategories,
} from './actions';

function loadCategories({ dispatch }) {
  const categories = [];
  // TODO: fetch GET / categories(복수) / categories/2(단수)
  // REST - CRUD => Read - collection(복수) / member, element(단수)
  dispatch(setCategories(categories));
}

function loadRestaurants({ dispatch }) {
  const restaurants = [];
  // TODO: load restaurants from API server.
  // 1. API server 확보
  // 2. fetch
  dispatch(setRestaurants(restaurants));
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadCategories({ dispatch });
    loadRestaurants({ dispatch });
  }, []);

  return (
    <>
      <h1>Restaurants</h1>
      <CategoriesContainer />
      <ListContainer />
      <FormContainer />
    </>
  );
}
