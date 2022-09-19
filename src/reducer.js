import { combineReducers } from 'redux';

import todosReducer from './pages/Todos/todosReducer';

const rootReducer = combineReducers({
  todosPage: todosReducer,
});

export default rootReducer;
