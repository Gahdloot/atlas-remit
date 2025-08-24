import { configureStore } from '@reduxjs/toolkit';
import { schoolPaymentSlice } from './api/schoolPaymentSlice';

export const store = configureStore({
  reducer: {
    [schoolPaymentSlice.reducerPath]: schoolPaymentSlice.reducer,
    // Add other slices here as you create them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          schoolPaymentSlice.util.getRunningQueriesThunk.fulfilled,
          schoolPaymentSlice.util.getRunningQueriesThunk.pending,
          schoolPaymentSlice.util.getRunningQueriesThunk.rejected,
        ],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: [schoolPaymentSlice.reducerPath],
      },
    }).concat(schoolPaymentSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;