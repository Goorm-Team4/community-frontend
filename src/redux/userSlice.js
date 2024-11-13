import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        username: "",
        isLoggedIn: false,
        accessToken: "",
        profileImageUrl: "",
    },
    reducers: {
        signupUser: (state, action) => {
            const { email, username, profileImageUrl } = action.payload;
            state.email = email;
            state.username = username;
            state.profileImageUrl = profileImageUrl;
        },
        loginUser: (state, action) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.email = "";
            state.username = "";
            state.isLoggedIn = false;
            state.accessToken = "";
            state.profileImageUrl = "";
        },
    },
});

export const { signupUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;