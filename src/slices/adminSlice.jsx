import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const adminLogin = createAsyncThunk('login', async (adminData, thunkApi) => {

    const response = await axios.post('http://localhost:3001/admin/login', adminData);
    console.log(response);
    let data = response.data;
    if (data.message === 'Success') {
      localStorage.setItem('id', data.payload.email);
      localStorage.setItem('token', data.payload);
    }
    if (data.message === 'Invalid Username' || data.message === 'Invalid Password') {
      return thunkApi.rejectWithValue(data);
    }
});

let adminSlice = createSlice({
  name: 'admin',
  initialState: { 
    },
  reducers: {
    clearLoginStatus:(state)=>{
          state.isSuccess=false;
          state.adminObj=null;
          state.isError=false;
          state.errMsg='';
          return state;
      }
  },
});

export const {clearLoginStatus} = adminSlice.actions
export default adminSlice.reducer;