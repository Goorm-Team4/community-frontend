import { createSlice } from '@reduxjs/toolkit'
import contentTemp from '../temp'

const initialState = {
  content : contentTemp
}

const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {

    
  }  
});

export const {} = contentSlice.actions

export default contentSlice.reducer