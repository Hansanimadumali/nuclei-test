import { createSlice } from "@reduxjs/toolkit";

export const userOnboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    step1: {
      fullName: "",
      telephone: "",
      email: "",
      country: "United States",
    },
    step2: {
      startValue: 10000,
      endValue: 100000,
      isInvestor: false,
    },
    step3: {
      preferences: [],
    },
  },
  reducers: {
    toStep2Pressed: (state, action) => {
      return {
        ...state,
        step1: action.payload.step1Data,
      };
    },
    toStep3Pressed: (state, action) => {
      return {
        ...state,
        step2: action.payload.step2Data,
      };
    },
    finishPressed: (state, action) => {
      return {
        ...state,
        step3: action.payload.step3Data,
      };
    },
  },
});

export const { toStep2Pressed, toStep3Pressed, finishPressed } =
  userOnboardingSlice.actions;

export default userOnboardingSlice.reducer;
