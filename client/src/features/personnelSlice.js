import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personnels: [],
  departments: [],
};

const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    getPersonnels: (state, action) => {
      state.personnels = action.payload;
    },
    getDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export const { getPersonnels, getDepartments } = personnelSlice.actions;
export default personnelSlice.reducer;
