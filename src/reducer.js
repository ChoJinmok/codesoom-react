import { combineReducers } from 'redux';

import todosReducer from './pages/Todos/todosReducer';
import registerRestaurantReducer from './pages/RegisterRestaurant/registerRestaurantReducer';
import restaurantsReducer from './pages/Restaurants/restaurantsReducer';

const rootReducer = combineReducers({
  todosPage: todosReducer,
  registerRestaurant: registerRestaurantReducer,
  restaurantsApp: restaurantsReducer,
});

export default rootReducer;
