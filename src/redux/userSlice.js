import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        username: "",
        isLoggedIn: false,
        accessToken: "",
        profileImage: "",
    },
    reducers: {
        signupUser: (state, action) => {
            const { email, username, profileImage } = action.payload;
            state.email = email;
            state.username = username;
            state.profileImage = profileImage;
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
            state.profileImage = "";
        },
    },
});

export const { signupUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;