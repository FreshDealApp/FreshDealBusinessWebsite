// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
import userReducer from './slices/userSlice';
import restaurantReducer from './slices/restaurantSlice';
import purchaseReducer from './slices/purchaseSlice';
import listingReducer from './slices/listingSlice';
import notificationReducer from './slices/NotificationSlice';
import ticketReducer from './slices/ticketSlice';
import punishmentReducer from './slices/punishmentSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // Add reducers here
        restaurant: restaurantReducer,
        purchases: purchaseReducer,
        listing: listingReducer,
        notifications: notificationReducer,
        tickets: ticketReducer,
        punishment: punishmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;