import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from "./collectionSlice"
import deckReducer from "./deckSlice"
import loadingReducer from "./loadingSlice"

export default configureStore({
  reducer: {
    collection: collectionReducer,
    deck: deckReducer,
    loading: loadingReducer
  },
})
