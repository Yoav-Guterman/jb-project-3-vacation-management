// vacationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";
import User from "../models/user/User";

interface VacationsState {
    vacations: Vacation[]
    isLoading: boolean
    currentPage: number
    itemsPerPage: number
}

const initialState: VacationsState = {
    vacations: [],
    isLoading: true,
    currentPage: 1,
    itemsPerPage: 9  // 9 vacations per page
}

export const vacationsSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload
            state.isLoading = false
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations = [action.payload, ...state.vacations]
        },
        remove: (state, action: PayloadAction<{ id: string }>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload.id)
        },
        update: (state, action: PayloadAction<Vacation>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id)
            if (index > -1) {
                state.vacations[index] = action.payload
            }
        },
        followVacation: (state, action: PayloadAction<{ vacationId: string, user: User }>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.vacationId);
            if (index > -1) {
                const vacation = state.vacations[index];
                if (!vacation.followers) {
                    vacation.followers = [];
                }
                if (!vacation.followers.some(f => f.id === action.payload.user.id)) {
                    vacation.followers.push(action.payload.user);
                }
            }
        },
        unfollowVacation: (state, action: PayloadAction<{ vacationId: string, user: User }>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.vacationId);
            if (index > -1 && state.vacations[index].followers) {
                state.vacations[index].followers = state.vacations[index].followers.filter(
                    f => f.id !== action.payload.user.id
                );
            }
        },
        // Pagination action
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    }
})

export const {
    init, newVacation, remove, update,
    followVacation, unfollowVacation, setCurrentPage
} = vacationsSlice.actions

export default vacationsSlice.reducer