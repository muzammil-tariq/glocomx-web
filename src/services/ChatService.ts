import { AxiosGet, AxiosPost } from "./AxiosService";

export const ChatService = {
    getAllChats: (streamId: string) => {
        return AxiosGet("Chat/" + streamId);
    },
    saveChat: (data: any) => {
        return AxiosPost("Chat", data);
    },
};
