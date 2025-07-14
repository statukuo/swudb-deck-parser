import { createSlice } from '@reduxjs/toolkit'

export const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        data: null,
    },
    reducers: {
        loadDeckData: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { loadDeckData } = deckSlice.actions

export default deckSlice.reducer
