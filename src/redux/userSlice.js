import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: null,
        username: null,
        isLoggedIn: false,
        accessToken: null,
        profileImageUrl: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.profileImageUrl = action.payload.profileImageUrl;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.email = null;
            state.username = null;
            state.profileImageUrl = null;
            state.isLoggedIn = false;
            state.accessToken = null;
          },
        updateUser: (state, action) => {
            const { username, profileImageUrl } = action.payload || {};
            if (username) state.username = username;
            if (profileImageUrl) state.profileImageUrl = profileImageUrl;
        },
    },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;