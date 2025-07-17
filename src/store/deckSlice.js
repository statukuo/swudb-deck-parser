import { createSlice } from '@reduxjs/toolkit'

export const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        data: null,
        firstTrilogy: null,
        secondTrilogy: null,
        thirdTrilogy: null
    },
    reducers: {
        loadDeckData: (state, action) => {
            state.data = action.payload
        },
        loadFirstTrilogyData: (state, action) => {
            state.firstTrilogy = action.payload
        },
        loadSecondTrilogyData: (state, action) => {
            state.secondTrilogy = action.payload
        },
        loadThirdTrilogyData: (state, action) => {
            state.thirdTrilogy = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { loadDeckData, loadFirstTrilogyData, loadSecondTrilogyData, loadThirdTrilogyData } = deckSlice.actions

export default deckSlice.reducer
