import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaves: []
}
const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        setLeaves: (state, action) => {
            state.leaves = action.payload;
        },
        addLeave: (state, action) => {
            state.leaves.unshift(action.payload);
        },
        removeLeave: (state, action) => {
            state.leaves = state.leaves.filter((leave) => leave._id !== action.payload);
        },
    }
});

export const { setLeaves, addLeave, removeLeave } = leaveSlice.actions;

export default leaveSlice.reducer;