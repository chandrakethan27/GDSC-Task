import axios from 'axios';
import {createAsyncThunk } from '@reduxjs/toolkit';

// // eventSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define an initial state
// const initialState = {
//   events: [],
// };

// export const createEvent = createAsyncThunk('events/create', async (eventName) => {
//   try {
//     // Send a POST request to the backend to create the event
//     const response = await axios.post('YOUR_BACKEND_URL/createEvent', { eventName });
//     return response.data; // Assuming the backend responds with the created event data
//   } catch (error) {
//     throw error;
//   }
// });

// // Define a reducer
// const eventSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createEvent.fulfilled, (state, action) => {
//       state.events.push(action.payload);
//     });
//   },
// });

// // Export actions and reducer
// export const { /* Other actions */ } = eventSlice.actions;
// export default eventSlice.reducer;
import {createSlice} from '@reduxjs/toolkit'

export const createEvent = createAsyncThunk('events/create', async (eventName) => {
  try {
    // Send a POST request to the backend to create the event
    const response = await axios.post('http://localhost:3001/user/login', { eventName });
    return response.data; // Assuming the backend responds with the created event data
  } catch (error) {
    throw error;
  }
});

export const eventSlice = createSlice({
    name:"event",
    initialState : {
        name: null,
        attendees: [],
    },
    reducers:{
        addEvent:(state, action)=>{
            state.push(action.payload)
        },
        delEvent:(state, action)=>{
            return state.filter(event => event !== action.payload);
        }
    }
})

export const {addEvent} = eventSlice.actions
export const {delEvent} = eventSlice.actions
export default eventSlice.reducer;