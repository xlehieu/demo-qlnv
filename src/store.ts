import { configureStore } from '@reduxjs/toolkit';
import StaffReducer from './features/StaffSlice';
export const store = configureStore({
    reducer: {
        staff: StaffReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
