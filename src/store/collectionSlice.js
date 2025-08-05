import { createSlice } from '@reduxjs/toolkit'

export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        cards: [],
    },
    reducers: {
        importCollection: (state, action) => {
            state.cards = action.payload

            console.log(state.cards)
        },
    },
})

// Action creators are generated for each case reducer function
export const { importCollection } = collectionSlice.actions

export default collectionSlice.reducer
