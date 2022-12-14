import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesContainer from './CategoriesContainer';
import FormContainer from './FormContainer';
import ListContainer from './ListContainer';

import {
  loadRestaurantInformations,
} from './registerRestaurantActions';

export default function RegisterRestaurantPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurantInformations('categories'));
    // loadCategories({ dispatch });
    // loadRestaurants({ dispatch });
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
