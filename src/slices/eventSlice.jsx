import axios from 'axios';
import {createAsyncThunk } from '@reduxjs/toolkit';
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
