import { combineReducers } from '@reduxjs/toolkit';
import loaderSlice from './slices/loaderSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    userReducer: userSlice,
    loaderReducer:loaderSlice
  });
  export default rootReducer;