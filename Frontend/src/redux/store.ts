import { configureStore } from '@reduxjs/toolkit';
import boothReducer from './modules/booth';
import foodTruckReducer from './modules/foodTruck'; // 추가

export const store = configureStore({
  reducer: {
    booth: boothReducer,
    foodTruck: foodTruckReducer, // ✅ 새로 추가
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;