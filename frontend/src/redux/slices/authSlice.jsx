import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null, // This will store user data including name, email, and profileImage
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // Payload should include user details
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        updateUserProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { login, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;