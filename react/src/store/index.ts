import { configureStore } from "@reduxjs/toolkit";
import squirrelsReducer from "@/features/squirrels/store/squirrelsSlice";

export const store = configureStore({
  reducer: {
    squirrels: squirrelsReducer,
  },
});






















export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
