import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { sendMessage } from "../../redux/reducers/chatReducer";
import { ChatService } from "../../services/ChatService";
import "./Chatbox.scss";

const Chatbox = ({ connection }: any) => {
    const { register, handleSubmit, setValue } = useForm();

    const [onlineUsers, setOnlineUsers] = useState(0);
    const { streamId } = useParams();
    const [allChats, setChats] = useState([]) as any;
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const userReduxState = useAppSelector((state) => state.auth);
    const chatReduxState = useAppSelector((state) => state.chats);
    const schReduxState = useAppSelector((state) => state.schedule);

    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        if (connection) {
            connection
                ?.send("SendMessage", streamId, userReduxState.userId, userReduxState.email, data.chat)
                .catch((err: any) => console.log(err));
        }

        setValue("chat", "");
        let height: number = Number(chatBoxRef.current?.scrollHeight);
        chatBoxRef?.current?.scrollTo(0, height);

        // ChatService.saveChat({
        //     streamId: streamId,
        //     message: data.chat,
        //     userId: userReduxState.userId,
        // }).catch((err) => console.log("Saving Error"));
    };

    const handleMessage = (data: any) => {
        let newData = JSON.parse(data);
        let newChat = {
            message: newData.Text,
            time: newData.SentAt,
            username: newData.SenderName,
            senderId: newData.UserId,
            photo: userReduxState.profilePic,
        };
        dispatch(sendMessage(newChat));
    };

    useEffect(() => {
        if (connection) {
            connection.on("onReceiveMessage", handleMessage);
            connection.on("onConnectionChange", (data: any) => {
                console.log(data);
                setOnlineUsers(data);
            });

            if (connection.state == "Disconnected") {
                connection.start().catch((err: any) => {
                    console.log(err);
                });
            }
        }
    }, [connection]);

    return (
        <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-lg mb-3 position-relative">
            <div className="messages-content scroll-bar p-3" ref={chatBoxRef}>
                {chatReduxState.chats?.map((chat: any, index: number) => {
                    let isHost = chat.senderId === userReduxState.userId ? true : false;
                    if (isHost) {
                        return (
                            <div key={index} className="message-item outgoing-message">
                                <div className="message-user">
                                    <figure className="avatar">
                                        <img src="./assets/images/user-1.png" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>You</h5>
                                        <div className="time">
                                            {moment(chat.time).format("h:mm a")}
                                            <i className="ti-double-check text-info"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="message-wrap">{chat.message}</div>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className="message-item">
                            <div className="message-user">
                                <figure className="avatar">
                                    <img src="./assets/images/user-9.png" alt="image" />
                                </figure>
                                <div>
                                    <h5 className="font-xssss mt-2">
                                        {chat.username}
                                        {chat.senderId === schReduxState.host.id && (
                                            <span className="badge badge-success ml-2">Host</span>
                                        )}
                                    </h5>
                                    <div className="time"> {moment(chat.time).format("h:mm a")}</div>
                                </div>
                            </div>
                            <div className="message-wrap shadow-none">{chat.message}</div>
                        </div>
                    );
                })}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg "
            >
                <button className="bg-grey float-left">
                    <i className="ti-microphone text-white"></i>
                </button>
                <div className="form-group">
                    <input
                        {...register("chat", { required: true })}
                        type="text"
                        autoComplete="off"
                        autoCorrect="false"
                        placeholder="Start typing..."
                    />
                </div>
                <button className="bg-current">
                    <i className="ti-arrow-right text-white"></i>
                </button>
            </form>
        </div>
    );
};

export default Chatbox;
