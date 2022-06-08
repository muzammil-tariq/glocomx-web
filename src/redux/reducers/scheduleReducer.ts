import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: 3,
    title: "",
    liveSessionId: "",
    startTime: "",
    endTime: "",
    description: "",
    tags: [],
    host: {
        id: "",
        userName: "",
        email: "",
    },
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setScheduleRedux: (state, action: PayloadAction<any>) => {
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.liveSessionId = action.payload.liveSessionId;
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
            state.description = action.payload.description;
            state.tags = action.payload.tags;
            state.host = {
                id: action.payload.host.id,
                userName: action.payload.host.userName,
                email: action.payload.host.email,
            };
        },
    },
});

export const { setScheduleRedux } = scheduleSlice.actions;

export default scheduleSlice.reducer;
