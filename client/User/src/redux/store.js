import {addListener, configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/auth.js';
import apiSilce from './api/api.js';
import buttonSilce from './reducers/buttons.js';
import chatSilce from './reducers/chat.js';
export const store=configureStore({
    reducer:{
        auth: authSlice.reducer,
        [apiSilce.reducerPath]:apiSilce.reducer,
        buttons:buttonSilce.reducer,
        [chatSilce.name]:chatSilce.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSilce.middleware)
});
export const  RootState=store.getState();
export const AppDispatch=store.dispatch;
export default store;
