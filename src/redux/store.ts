import { configureStore } from '@reduxjs/toolkit';
import boothReducer from './modules/booth';

export const store = configureStore({
  reducer: {
    booth: boothReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;