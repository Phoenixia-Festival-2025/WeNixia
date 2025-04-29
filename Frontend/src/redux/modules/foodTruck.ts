// /redux/modules/foodTruck.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: string;
}

interface FoodTruck {
  id: number;
  name: string;
  description: string;
  status: string;
  menuItems: MenuItem[];
}

interface FoodTruckState {
  foodTrucks: FoodTruck[];
}

const initialState: FoodTruckState = {
  foodTrucks: [],
};

const foodTruckSlice = createSlice({
  name: 'foodTruck',
  initialState,
  reducers: {
    setFoodTrucks: (state, action: PayloadAction<FoodTruck[]>) => {
      state.foodTrucks = action.payload;
    },
  },
});

export const { setFoodTrucks } = foodTruckSlice.actions;
export default foodTruckSlice.reducer;