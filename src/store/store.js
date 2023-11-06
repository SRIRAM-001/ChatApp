import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserDetails";


import thunkMiddleware from 'redux-thunk';


const middle= [thunkMiddleware];

const store = configureStore({
    reducer:{
        user:UserReducer
    },
     middleware: ( getDefaultMiddleware )=>getDefaultMiddleware({serializableCheck: false}).concat(middle),
})


export default store;