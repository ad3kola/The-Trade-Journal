import { UserProps } from "@/lib/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state of the user
const initialState: UserProps = {
  email: "",
  fullName: "",
  phone: "",
  id: "",
  profile: "",
};

// Create the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.phone = action.payload.phone;
      state.profile = action.payload.profile;
    },
    // Clear user data
    clearUser: (state) => {
      state.email = "";
      state.fullName = "";
      state.phone = "";
      state.profile = "";
      state.id = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
