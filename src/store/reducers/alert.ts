import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Alert } from '../types/alertType';

type IInitialState = Alert;

const initialState: IInitialState = {};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alertAction: (state, action: PayloadAction<Alert>) => {
      return action.payload;
    },
  },
});
export const { alertAction } = alertSlice.actions;

export default alertSlice.reducer;
