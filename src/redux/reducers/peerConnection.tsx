import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    peerConnections: [] as RTCPeerConnection[],
};

const peerSlice = createSlice({
    name: "peersList",
    initialState,
    reducers: {
        addPeers: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            
            state.peerConnections.push(action.payload);
        },
    },
});

export const { addPeers } = peerSlice.actions;

export default peerSlice.reducer;
