import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booth } from '@/lib/boothData';

interface BoothState {
  booths: Booth[];
}

const initialState: BoothState = {
  booths: [],
};

const boothSlice = createSlice({
  name: 'booth',
  initialState,
  reducers: {
    setBooths: (state, action: PayloadAction<Booth[]>) => {
      state.booths = action.payload;
    },
  },
});

export const { setBooths } = boothSlice.actions;
export default boothSlice.reducer;