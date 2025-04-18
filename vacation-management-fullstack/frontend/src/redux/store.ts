import { configureStore } from "@reduxjs/toolkit";
import { vacationsSlice } from "./vacationsSlice";

const store = configureStore({
    reducer: { // slice list
        vacations: vacationsSlice.reducer,
    }

})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch