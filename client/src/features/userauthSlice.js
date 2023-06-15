import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {loginAPI, registerAPI} from "../api/loginApi";

const initialState = {
    mode:"light",
    isLoggedIn: false,
    user: null,
    token:null,
    error: null,
    isRegistered:false
};

export const login = createAsyncThunk('/auth/login', async (credentials) => {
    try {
        const response = await loginAPI(credentials);        
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const register = createAsyncThunk('/auth/register', async (userdata) => {
    try {
        const response = await registerAPI(userdata);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const modeset = () => {
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {                
                if(action.payload.status) {
                    state.isLoggedIn = true;
                    state.user = action.payload.data;
                    state.token = action.payload.token;
                } else {
                    state.isLoggedIn = false;
                    state.error = action.payload.message;
                }                
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.isRegistered = false;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isRegistered = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isRegistered = false;
                state.error = action.error.message;
            })
            .addCase(modeset, (state) => {
                state.mode = state.mode === "light" ? "dark" : "light";
            });
    },
});

export default userSlice.reducer;