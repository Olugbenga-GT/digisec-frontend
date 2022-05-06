import {createSlice  , createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';

// To get the curent user from  local Storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
user : user ? user : null,
isError : false ,
isSuccess : false ,
isLoading : false ,
message : ''

}                

// All Asynchronous  Thunk Actions ...
//  R E G I S T E R
export const register = createAsyncThunk('auth/register' , async(userData , thunkAPI) => {
        try{  return await authService.register(userData)}
        catch(error)
        {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })
// L   O    G    I    N
export const login = createAsyncThunk('auth/login' , async(userData , thunkAPI) => {
        try{  return await authService.login(userData)}
        catch(error)
        {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

    //  L  O  G  O  U  T
    export const logout = createAsyncThunk('auth/logout' , async () => {
        await authService.logout()
    })


     export const authSlice = createSlice({
    name : 'auth' ,
    initialState,

    // The synchronous reducers go in here
    reducers : {

      reset  : (state) => {
          state.isLoading = false
          state.isSuccess = false
          state.isError = false
          state.message = ''
        }
    },

    // The asynchronous reducers go in herre
    exttraReducers : (builder) => {
        builder
            .addCase( register.pending , (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state , action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user  = action.payload
            })
            .addCase( register.rejected , (state , action) => {
                state.isLoading = false
                state.isError = true
                // This rejection message is form the try/catch upt here                
                state.message = action.payload
                state.user = null
            })
            .addCase( login.pending , (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state , action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user  = action.payload
            })
            .addCase( login.rejected , (state , action) => {
                state.isLoading = false
                state.isError = true
                // This rejection message is form the try/catch upt here                
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
        }


})

export const {reset ,  } = authSlice.actions ;  
export default authSlice.reducer