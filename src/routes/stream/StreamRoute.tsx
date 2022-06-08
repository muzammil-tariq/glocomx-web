import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SignalREndpoint } from "../../common/constants";
import Chatbox from "../../components/chatbox/Chatbox";
import Toolbar from "../../components/toolbar/Toolbar";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setScheduleRedux } from "../../redux/reducers/scheduleReducer";
import { ScheduleService } from "../../services/ScheduleService";
import StreamAudience from "./components/StreamAudience";
import StreamDetails from "./components/StreamDetails";
import VideoStreamPlayer from "../../components/VideoStreamPlayer/VideoStreamPlayer";
import "./StreamStyles.scss";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const StreamRoute = () => {
    const videoRef = useRef<HTMLVideoElement>();
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState() as any;
    const [connection, setConnection] = useState<null | HubConnection>(null);
    const [connectionId, setConnectionId] = useState(null) as any;
    const peerConnectionRef = useRef<Map<string, RTCPeerConnection>>(new Map<string, RTCPeerConnection>());
    const { scheduleId, streamId } = useParams();
    const textRef = useRef(null) as any;
    const dispatch = useAppDispatch();
    const candidateRef = useRef<[]>([]) as any;
    const mediaStream = useRef(null) as any;

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

    const startStream = (connectionId: string) => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true,
            })
            .then(function (stream) {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.volume = 0;

                    console.log("I am here to add track to peerConnection");

                    stream.getTracks().forEach((t) => peerConnectionRef.current.get(connectionId)?.addTrack(t, stream));

                    videoRef.current.play().then(() => {
                        createOffer(connectionId);
                    });
                }
            })
            .catch((err) => console.log("Stream Error: ", err));
    };

    const createOffer = (connectionId: string) => {
        peerConnectionRef.current
            .get(connectionId)
            ?.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
            .then((sdp) => {
                console.log("Offer Created" + connectionId);
                //console.log(JSON.stringify(sdp));
                connection?.invoke("SendOffer", connectionId, streamId, sdp);
                peerConnectionRef.current.get(connectionId)?.setLocalDescription(sdp);
            })
            .catch((err) => console.log(err));
    };

    const setRemoteDescription = (answer: any) => {
        let { connectionId, message } = JSON.parse(answer);
        console.log("Adding Answer", message);
        console.log("Peer Conn", connectionId, peerConnectionRef);

        if (peerConnectionRef.current.get(connectionId)?.remoteDescription == null) {
            peerConnectionRef.current.get(connectionId)?.setRemoteDescription(new RTCSessionDescription(message));
        }

        console.log(candidateRef.current);

        if (connection?.state == "Disconnected") {
            connection?.start().then(() => {
                connection?.invoke("SendCandidate2Peer", connectionId, streamId, candidateRef.current);
            });
        } else {
            connection?.invoke("SendCandidate2Peer", connectionId, streamId, candidateRef.current);
        }
    };

    const startStreaming = () => {
        if (videoRef.current?.paused) {
            startStream("Host");
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    };

    const muteUnmute = () => {};

    const record = () => {};

    const initNewPeerConnection = (connectionId: string) => {
        let isNew = peerConnectionRef.current.has(connectionId);
        if (!isNew) {
            candidateRef.current = [];
            if (!videoRef.current?.paused) {
                const pc = new RTCPeerConnection();

                console.log("Adding Stream", connectionId);

                let stream: any = videoRef.current?.srcObject;
                stream.getTracks().forEach((track: any) => pc.addTrack(track, stream));

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log(JSON.stringify(event.candidate));
                        candidateRef.current.push(JSON.stringify(event.candidate));
                    }
                };
                peerConnectionRef.current?.set(connectionId, pc);
                console.log("Connection");
                createOffer(connectionId);
            }
        }
    };

    useEffect(() => {
        const connect = new HubConnectionBuilder().withUrl(SignalREndpoint + "?streamId=" + streamId).build();

        const pc = new RTCPeerConnection();
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(JSON.stringify(event.candidate));
                candidateRef.current.push(JSON.stringify(event.candidate));
            }
        };
        peerConnectionRef.current?.set("Host", pc);

        getStreamDetails();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.on("onAnswer", (data: any) => {
                setRemoteDescription(data);
            });

            connection.on("onConnected", (connectionId: string) => {
                initNewPeerConnection(connectionId);
                setConnectionId(connectionId);
            });

            if (connection.state === "Disconnected") {
                connection.start().catch((err: any) => console.log(err));
            }
        }
    }, [connection]);

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
                                isHost={true}
                                muteUnmute={muteUnmute}
                                record={record}
                                startStream={startStreaming}
                            />
                            <StreamDetails data={schedule} />
                            <StreamAudience />
                            {/* <textarea ref={textRef} name="" id=""></textarea>
                            <button onClick={createOffer}>Create Offer</button>
                            <button onClick={addCandidate}>Add ICE</button>
                            <button onClick={setRemoteDescription}>Add Remote</button> */}
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

export default StreamRoute;
