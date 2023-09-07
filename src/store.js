import {configureStore} from '@reduxjs/toolkit'
import adminReducer from './slices/adminSlice'
import userReducer from './slices/userSlice'
import eventReducer from './slices/eventSlice'
export const store = configureStore({
    reducer:{
        admin:adminReducer, // calling a sllice only just the name is adminReduce
        data:userReducer,
        event:eventReducer
    }
})