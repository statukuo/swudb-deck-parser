import { createSlice } from '@reduxjs/toolkit'

export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        cards: [],
    },
    reducers: {
        importCollection: (state, action) => {
            state.cards = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { importCollection } = collectionSlice.actions

export default collectionSlice.reducer
