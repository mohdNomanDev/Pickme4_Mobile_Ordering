import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [
    {
      _id: "1",
      label: "Home",
      houseNumber: "Flat 402",
      buildingName: "Skyline Apartments",
      street: "Main Avenue",
      landmark: "Near City Park",
      city: "New York",
      state: "NY",
      country: "USA",
      pincode: "10001",
      deliveryInstructions: "Leave at the front desk",
      isDefault: true,
    },
    {
      _id: "2",
      label: "Work",
      houseNumber: "Floor 12",
      buildingName: "Tech Hub",
      street: "Silicon Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      pincode: "94105",
      isDefault: false,
    }
  ],
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
