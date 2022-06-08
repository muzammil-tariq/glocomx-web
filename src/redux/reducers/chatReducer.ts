import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatMessage {
    message: string;
    time: string;
    username: string;
    senderId: string;
    photo: string;
}

const initialState = {
    chats: [] as any,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<any>) => {
            state.chats.push(action.payload);
        },
    },
});

export const { sendMessage } = chatSlice.actions;

export default chatSlice.reducer;
