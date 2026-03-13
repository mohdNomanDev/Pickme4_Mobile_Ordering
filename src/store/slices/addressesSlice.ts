import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  addresses: [],
}


const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    }
  },
});

export const {
  setAddresses
} = addressesSlice.actions;

export default addressesSlice.reducer;
