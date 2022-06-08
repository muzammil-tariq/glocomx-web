import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import chatReducer from "../reducers/chatReducer";
import peerConnection from "../reducers/peerConnection";
import scheduleReducer from "../reducers/scheduleReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        schedule: scheduleReducer,
        chats: chatReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
