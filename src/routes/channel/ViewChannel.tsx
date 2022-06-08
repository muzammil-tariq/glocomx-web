import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SignalREndpoint } from "../../common/constants";
import Chatbox from "../../components/chatbox/Chatbox";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Toolbar from "../../components/toolbar/Toolbar";
import VideoStreamPlayer from "../../components/VideoStreamPlayer/VideoStreamPlayer";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setScheduleRedux } from "../../redux/reducers/scheduleReducer";
import { ScheduleService } from "../../services/ScheduleService";
import StreamDetails from "../stream/components/StreamDetails";

const ViewChannel = () => {
    const videoRef = useRef<HTMLVideoElement>();
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState<null | HubConnection>(null);
    const { scheduleId, streamId } = useParams();
    const [schedule, setSchedule] = useState() as any;
    const dispatch = useAppDispatch();
    const textRef = useRef(null) as any;

    let peerConnectionRef = useRef<RTCPeerConnection>(new RTCPeerConnection());

    const createAnswer = (connectionId: string) => {
        peerConnectionRef.current
            .createAnswer()
            .then(async (sdp) => {
                // console.log(JSON.stringify(sdp));
                console.log("Answer Created - ", connectionId);
                if (peerConnectionRef.current.localDescription == null) {
                    await peerConnectionRef.current.setLocalDescription(sdp);
                    connection?.invoke("SendAnswer", connectionId, streamId, sdp);
                } else {
                    console.log("Local Description is already set");
                    console.log(peerConnectionRef);
                }
            })
            .catch((err) => console.log(err));
    };

    const setRemoteDesc = async (offer: any) => {
        let { connectionId, message } = JSON.parse(offer);
        console.log(message);
        if (peerConnectionRef.current.remoteDescription == null) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message));
            createAnswer(connectionId);
        } else {
            console.log(peerConnectionRef);
            console.log("Remote is already Set");
        }
    };

    const addCandidate = async (candidate: any) => {
        let { message } = JSON.parse(candidate);
        console.log("candidate", message);
        console.log(peerConnectionRef);

        message.forEach((can: any) => {
            peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(JSON.parse(can)));
        });
    };

    const addCandidateAD = (candidate: any) => {
        let message = JSON.parse(textRef.current.value);
        console.log(message);
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(message));
    };

    useEffect(() => {
        const connect = new HubConnectionBuilder().withUrl(SignalREndpoint + "?streamId=" + streamId).build();

        let pc = new RTCPeerConnection();

        // pc.onicecandidate = (event) => {
        //     if(event.candidate){
        //         console.log(JSON.stringify(event.candidate));
        //         if(connect.state == 'Disconnected'){
        //             connect.start().then(() => {
        //                 connect.invoke("SendCandidate2Host", "some", streamId, event.candidate);
        //             });

        //         }else{
        //             connect.invoke("SendCandidate2Host", "some", streamId, event.candidate);
        //         }
        //     }
        // }
        pc.ontrack = (e) => {
            console.log(e);
            if (videoRef.current) {
                videoRef.current.srcObject = e.streams[0];
            }
        };

        videoRef?.current?.addEventListener("loadedmetadata", () => {
            if (videoRef.current) {
                videoRef.current.volume = 1;
                videoRef.current?.play().catch((err) => {
                    console.log(err);
                });
            }
        });

        peerConnectionRef.current = pc;
        getStreamDetails();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.on("onOffer", (data: any) => {
                setRemoteDesc(data);
            });

            connection.on("onHostCandidate", (data: any) => {
                addCandidate(data);
            });

            if (connection.state === "Disconnected") {
                connection.start().catch((err: any) => {
                    console.log(err);
                });
            }
        }
    }, [connection]);

    const getStreamDetails = () => {
        setLoading(false);
        ScheduleService.getLiveSessionDetails(Number(scheduleId))
            .then((data: any) => {
                dispatch(setScheduleRedux(data.data));
                setSchedule(data.data);

                setLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const startStreaming = () => {
        if (videoRef.current) {
            videoRef.current.addEventListener("loadedmetadata", () => {
                videoRef.current?.play().catch((err) => console.log(err));
            });
        }
    };

    return (
        <div className="main-content">
            <Toolbar />
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-xl-8 col-xxl-9">
                            <VideoStreamPlayer
                                ref={videoRef}
                                streamData={schedule}
                                isHost={false}
                                startStream={startStreaming}
                            />
                            <StreamDetails data={schedule} />
                            {/* <textarea ref={textRef} name="" id=""></textarea> */}
                            {/* <button onClick={createAnswer}>Create Answer</button> */}
                            {/* <button onClick={addCandidateAD}>Add ICE</button>
                            <button onClick={setRemoteDesc}>Add Remote</button> */}
                        </div>
                        <div className="col-xl-4 col-xxl-3">{loading && <Chatbox connection={connection} />}</div>
                    </div>
                </div>

                <div className="middle-sidebar-right right-scroll-bar">
                    <div className="middle-sidebar-right-content">
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewChannel;
