import { createSlice } from '@reduxjs/toolkit';

export interface Address {
  _id?: string;
  label: string;
  shortAddress?: string;
  buildingNumber: string;
  streetName: string;
  district: string;
  city: string;
  region: string;
  postalCode: string;
  secondaryNumber?: string;
  buildingName?: string;
  apartmentNumber?: string;
  floor?: string;
  landmark?: string;
  contactNumber: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  deliveryInstructions?: string;
  isDefault: boolean;
  createdAt?: string;
}

interface AddressesState {
  addresses: Address[];
}

const initialState: AddressesState = {
  addresses: [
    {
      _id: "1",
      label: "Home",
      shortAddress: "RAGI2929",
      buildingNumber: "2929",
      streetName: "Al Maather St",
      district: "Al Olaya",
      city: "Riyadh",
      region: "Riyadh Region",
      postalCode: "12211",
      secondaryNumber: "7029",
      buildingName: "Olaya Tower",
      apartmentNumber: "402",
      floor: "4",
      landmark: "Near Kingdom Centre",
      contactNumber: "+966501234567",
      location: {
        type: "Point",
        coordinates: [46.6753, 24.7136],
      },
      deliveryInstructions: "Leave at the front desk",
      isDefault: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      label: "Work",
      shortAddress: "WORK1234",
      buildingNumber: "1234",
      streetName: "King Fahd Rd",
      district: "Al Sahafah",
      city: "Riyadh",
      region: "Riyadh Region",
      postalCode: "13321",
      buildingName: "Tech Hub Center",
      floor: "12",
      contactNumber: "0559876543",
      location: {
        type: "Point",
        coordinates: [46.6345, 24.8123],
      },
      isDefault: false,
      createdAt: new Date().toISOString(),
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
