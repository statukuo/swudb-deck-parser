import { createSlice } from '@reduxjs/toolkit'

export const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        data: null,
        decks: [],
        firstTrilogy: null,
        secondTrilogy: null,
        thirdTrilogy: null
    },
    reducers: {
        loadDeckData: (state, action) => {
            state.data = action.payload
            if (action.payload) {
                state.decks = [action.payload]
            } else {
                state.decks = []
            }
        },
        addDeckData: (state, action) => {
            if (action.payload) {
                state.decks.push(action.payload)
                state.data = action.payload
            }
        },
        removeDeckData: (state, action) => {
            const index = action.payload
            if (index >= 0 && index < state.decks.length) {
                state.decks.splice(index, 1)
                state.data = state.decks.length > 0 ? state.decks[state.decks.length - 1] : null
            }
        },
        clearDecks: (state) => {
            state.decks = []
            state.data = null
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
export const { loadDeckData, addDeckData, removeDeckData, clearDecks, loadFirstTrilogyData, loadSecondTrilogyData, loadThirdTrilogyData } = deckSlice.actions

export default deckSlice.reducer
