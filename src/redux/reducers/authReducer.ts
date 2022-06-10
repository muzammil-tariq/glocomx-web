import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: "",
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  profilePic: "",
  accessToken: "",
  refreshToken: "",
  role: "",
  roleId: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<any>) => {
      debugger;
      if (action.payload) {
        state.email = action.payload.data.Email;
        state.phone = action.payload.phone;
        state.accessToken = action.payload.data.AccessToken;
        state.refreshToken = action.payload.data.AccessToken;
        state.userId = action.payload.data.Id;
        state.firstName = action.payload.data.FirstName;
        state.lastName = action.payload.data.LastName;
        state.profilePic = action.payload.data.ProfilePic;
        state.role = action.payload.data.role;
        state.roleId = action.payload.data.roleId;
        if (
          action.payload.data.Id !== undefined &&
          action.payload.data.Id !== null
        ) {
          state.isLoggedIn = true;
        }
      }
    },

    setAuth: (state, action: PayloadAction<any>) => {
      debugger;
      state.email = action.payload.data.Email;
      state.phone = action.payload.phone;
      state.accessToken = action.payload.data.AccessToken;
      state.refreshToken = action.payload.data.AccessToken;
      state.userId = action.payload.data.Id;
      state.firstName = action.payload.data.FirstName;
      state.lastName = action.payload.data.LastName;
      state.profilePic = action.payload.data.ProfilePic;
      state.role = action.payload.data.role;
      state.roleId = action.payload.data.roleId;
      if (
        action.payload.data.Id != undefined &&
        action.payload.data.Id != null
      ) {
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.email = "";
      state.phone = "";
      state.firstName = "";
      state.lastName = "";
      state.profilePic = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.role = "";
      state.roleId = 0;
    },
  },
});

export const { initUser, setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
