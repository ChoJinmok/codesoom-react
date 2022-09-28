import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './pages/Todos/todosReducer';
import registerRestaurantReducer from './pages/RegisterRestaurant/registerRestaurantReducer';
import restaurantsReducer from './pages/Restaurants/slice';

const store = configureStore({
  reducer: {
    todosPage: todosReducer,
    registerRestaurant: registerRestaurantReducer,
    restaurantsApp: restaurantsReducer,
  },
});

export default store;
