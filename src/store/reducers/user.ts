import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/userType';

type IInitialState = User;

const initialState: IInitialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAccount: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { loginAccount } = userSlice.actions;

export default userSlice.reducer;
