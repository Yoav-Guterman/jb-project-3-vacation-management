import { configureStore } from "@reduxjs/toolkit";
import { vacationsSlice } from "./vacationsSlice";

const store = configureStore({
    reducer: { // slice list
        // following: followingSlice.reducer, // single slice
        // followers: followersSlice.reducer,
        vacations: vacationsSlice.reducer,
        // feed: feedSlice.reducer
    }

})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch