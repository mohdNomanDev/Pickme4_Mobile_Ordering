import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userProfile: {},
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    updateProfile: (state, action) => {
      if (state.userProfile) {
        state.userProfile = { ...state.userProfile, ...action.payload };
      }
    },
    
  },
});

export const {
  setProfile,
  updateProfile
} = userSlice.actions;

export default userSlice.reducer;
