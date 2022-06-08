import { AxiosPost, AxiosGet, AxiosRemove } from "./AxiosService";

export const ScheduleService = {
    addLiveSession: (data: any) => {
        return AxiosPost("Schedules", data);
    },
    getLiveSession: (userId?: any) => {
        if (userId != undefined) {
            return AxiosGet("Schedules?hostId=" + userId);
        }
        return AxiosGet("Schedules");
    },

    getLiveSessionDetails: (scheduleId: number) => {
        return AxiosGet("Schedules/" + scheduleId);
    },

    deleteSchedule: (scheduleId: number) => {
        return AxiosRemove("Schedules/" + scheduleId);
    },
};
