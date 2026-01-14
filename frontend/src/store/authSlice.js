import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, loginGoogleApi } from "../services/authApi";

/* =============================
   ASYNC THUNKS
   ============================= */

export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await loginApi(payload);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

export const loginGoogle = createAsyncThunk(
    "auth/loginGoogle",
    async (credential, { rejectWithValue }) => {
        try {
            const res = await loginGoogleApi(credential);
            return res.data;
        } catch {
            return rejectWithValue("Google login failed");
        }
    }
);

/* =============================
   SLICE
   ============================= */

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* LOGIN */
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* GOOGLE LOGIN */
            .addCase(loginGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
