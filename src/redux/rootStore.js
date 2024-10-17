import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

export const rootStore = configureStore({
  reducer: rootReducer
});
