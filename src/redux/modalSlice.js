import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isModalOpen: false,
        modalType: "login",
    },
    reducers: {
        openModal: (state, action) => {
            if (!state.isModalOpen || state.modalType !== action.payload) {
                // 중복 호출 방지
                state.isModalOpen = true;
                state.modalType = action.payload;
            }
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;