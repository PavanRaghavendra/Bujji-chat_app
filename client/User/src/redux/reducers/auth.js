import {createSlice} from '@reduxjs/toolkit'
import { adminValidation, getAdmin, logoutAdmin } from './thunk/admin';
import {toast} from 'react-hot-toast'
const initialState={
    user:null,
    isAdmin:false
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:
    {
        userExisits(state,action){
            state.user=action.payload;
        },
        userNotExists(state) {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminValidation.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isAdmin = true;  // Note: changed comma to semicolon
            toast.success(action.payload);
        }),
        builder.addCase(adminValidation.rejected, (state, action) => {
            console.log(action.payload);
            state.isAdmin = false;  // Note: changed comma to semicolon
            toast.error(action.payload);
        }),
        builder.addCase(getAdmin.fulfilled, (state, action) => {
            if(action.payload)
                state.isAdmin = true;
        }),
        builder.addCase(getAdmin.rejected, (state, action) => {
            //console.log(action.payload);
            if(action.payload)
                state.isAdmin=false
        }),
        builder.addCase(logoutAdmin.fulfilled, (state, action) => {
            state.isAdmin=false
        }),
        builder.addCase(logoutAdmin.rejected, (state, action) => {
            state.isAdmin=true
        })
    }
});
export default authSlice;
export const {userExisits,userNotExists,setAdmin}=authSlice.actions;
