import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userId: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    profilePic: "",
    token: "",
    role: "",
    roleId: 0,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initUser: (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.email = action.payload.email;
                state.phone = action.payload.phone;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.role = action.payload.role;
                state.roleId = action.payload.roleId;
                if (action.payload.userId !== undefined && action.payload.userId !== null) {
                    state.isLoggedIn = true;
                }
            }
        },

        setAuth: (state, action: PayloadAction<any>) => {
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.profilePic = action.payload.profilePic;
            state.role = action.payload.role;
            state.roleId = action.payload.roleId;
            if (action.payload.userId != undefined && action.payload.userId != null) {
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
            state.token = "";
            state.role = "";
            state.roleId = 0;
        },
    },
});

export const { initUser, setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
