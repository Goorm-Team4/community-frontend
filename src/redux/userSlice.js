import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: null,
        username: null,
        isLoggedIn: false,
        accessToken: null,
        profileImageUrl: null,
        isPasswordChange: false, // 비밀번호 변경 상태
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
            state.isPasswordChange = false;

            // localStorage에서 userState 삭제
            localStorage.removeItem('userState');
            localStorage.removeItem('accessToken');
        },
        updateUser: (state, action) => {
            const { username, profileImageUrl } = action.payload || {};
            if (username) state.username = username;
            state.profileImageUrl = profileImageUrl;
        },
        changePasswordStatus: (state, action) => {
            state.isPasswordChange = action.payload;
        },
    },
});

export const { loginUser, logoutUser, updateUser, changePasswordStatus } = userSlice.actions;
export default userSlice.reducer;