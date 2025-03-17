import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";

interface VacationsState {
    vacations: Vacation[]
    isLoading: boolean
}

const initialState: VacationsState = {
    vacations: [],
    isLoading: true
}

export const vacationsSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload
            console.log('initialized')
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations = [action.payload, ...state.vacations]
            console.log(`added ${action.payload.destination} vacation`)
        },
        remove: (state, action: PayloadAction<{ id: string }>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload.id)
            console.log(`deleted ${action.payload.id} vacation`)
        },
        update: (state, action: PayloadAction<Vacation>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id)
            if (index > -1) {
                state.vacations[index] = action.payload
            }
        },
    }
})

export const { init, newVacation, remove, update } = vacationsSlice.actions

export default vacationsSlice.reducer