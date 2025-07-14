import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        active: false,
    },
    reducers: {
        startLoading: (state) => {
            state.active = true;
        },
        stopLoading: (state) => {
            state.active = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer
