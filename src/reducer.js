import { combineReducers } from 'redux';

import todosReducer from './pages/Todos/todosReducer';
import registerRestaurantReducer from './pages/RegisterRestaurant/registerRestaurantReducer';

const rootReducer = combineReducers({
  todosPage: todosReducer,
  registerRestaurant: registerRestaurantReducer,
});

export default rootReducer;
