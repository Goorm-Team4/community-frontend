import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
        message: "",
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true;
            state.message = action.payload || "잠시만 기다려주세요.";
        },
        clearLoading: (state) => {
            state.isLoading = false;
            state.message = "";
        },
    },
});

export const { setLoading, clearLoading } = loadingSlice.actions;
export default loadingSlice.reducer;