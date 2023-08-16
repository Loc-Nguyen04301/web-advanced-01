import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import alertReducer from './alert';

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
});

export default rootReducer;
