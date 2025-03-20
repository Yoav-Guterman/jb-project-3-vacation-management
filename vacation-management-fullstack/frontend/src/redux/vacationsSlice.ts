import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";
import User from "../models/user/User";

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
        // New reducers for follow functionality
        followVacation: (state, action: PayloadAction<{ vacationId: string, user: User }>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.vacationId);
            if (index > -1) {
                const vacation = state.vacations[index];

                // Initialize followers array if it doesn't exist
                if (!vacation.followers) {
                    vacation.followers = [];
                }

                // Check if user is already following to prevent duplicates
                if (!vacation.followers.some(f => f.id === action.payload.user.id)) {
                    vacation.followers.push(action.payload.user);
                }
            }
        },

        unfollowVacation: (state, action: PayloadAction<{ vacationId: string, user: User }>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.vacationId);
            if (index > -1 && state.vacations[index].followers) {
                // Remove user from followers array
                state.vacations[index].followers = state.vacations[index].followers.filter(
                    f => f.id !== action.payload.user.id
                );
            }
        }
    }
})

export const { init, newVacation, remove, update, unfollowVacation, followVacation } = vacationsSlice.actions

export default vacationsSlice.reducer