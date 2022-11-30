import { configureStore } from "@reduxjs/toolkit";
import userOnboardingSlice from "../Pages/UserOnboarding/userOnboardingSlice";

export default configureStore({
    reducer: {
        userOnboarding: userOnboardingSlice
    }
})