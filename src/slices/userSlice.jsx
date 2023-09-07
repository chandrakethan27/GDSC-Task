import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk('login', async (userData, thunkApi) => {
   
    const response = await axios.post('http://localhost:3001/user/login', userData);
    console.log(response);
    const data = response.data;

    if (data.message === 'Success') {
      localStorage.setItem('id', data.payload.email);
      localStorage.setItem('token', data.payload);
    }

    if (data.message === 'Invalid Username' || data.message === 'Invalid Password') {
      return thunkApi.rejectWithValue(data);
    }
  } 
);

let userSlice = createSlice({
  name: 'user',
  initialState: { 
    },
  reducers: {

  },

});

export const {clearLoginStatus} = userSlice.actions
export default userSlice.reducer;