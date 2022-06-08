import moment from "moment";
import React, { forwardRef, useEffect, useRef } from "react";
import { ServerBasePoint } from "../../common/constants";
import { useAppSelector } from "../../redux/hooks/hooks";
import "./VideoStreamPlayerStyle.scss";

const VideoStreamPlayer = forwardRef(
  ({ streamData, startStream, muteUnmute, record, isHost }: any, ref: any) => {
    const host = useAppSelector((state) => state.schedule.host);
    const playTime = useRef<HTMLDivElement>(null);
    useEffect(() => {
      console.log(streamData);

      return () => {};
    }, [streamData]);

    const handleOnTimeUpdate = (e: any) => {
      let min,
        sec = 0;
      var percent = (e.target.currentTime / e.target.duration) * 100;

      /////Passed time////
      var mins: any = Math.floor(e.target.currentTime / 60);
      if (mins < 10) {
        mins = "0" + String(mins);
      }
      var secs: any = Math.floor(e.target.currentTime % 60);
      if (secs < 10) {
        secs = "0" + String(secs);
      }

      if (playTime.current) {
        playTime.current.innerHTML = mins + ":" + secs;
      }
    };

    return (
      <div className="card border-0 mb-0 rounded-lg overflow-hidden live-stream bg-image-center bg-image-cover">
        <video
          className="videoElement"
          autoPlay={isHost ? false : true}
          ref={ref}
          width="100px"
          height="100px"
          onTimeUpdate={handleOnTimeUpdate}
        ></video>

        <img
          src={ServerBasePoint + streamData?.thumbnail}
          width="100%"
          alt="bg"
          height="100%"
        />
        <div className="reminder">
          <div className="text-center">
            <div className="display-1">
              {moment(streamData?.startTime).format("MMMM Do YYYY")}
            </div>
            <div className="display-3">
              {moment(streamData?.startTime).format("h:mm a")} -{" "}
              {moment(streamData?.endTime).format("h:mm a")}
            </div>
          </div>
        </div>
        <div className="card-body d-flex justify-content-start p-2 position-absolute top-0 w-100 bg-gradiant-top">
          <figure className="avatar mb-0 mt-0 overflow-hidden">
            <img
              alt="user"
              src="./assets/images/user-1.png"
              className="z-index-1 shadow-sm rounded-circle w40"
            />
          </figure>
          <h5 className="text-white mt-1 fw-700 ml-2 z-index-1 ">
            {host.userName}
            <span className="d-block font-xsssss mt-1 fw-400 text-grey-300 z-index-1 ">
              {moment(
                moment(streamData?.endTime).diff(moment(streamData?.startTime))
              ).format("h:mm a")}
            </span>
          </h5>
          <span className="live-tag position-absolute right-15 mt-2 bg-danger p-2 z-index-1  rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">
            LIVE
          </span>
        </div>
        <div className="card-body text-center p-3 position-absolute flex justify-content-center w-100 bottom-0 bg-gradiant-bottom">
          {isHost && (
            <>
              <button
                onClick={() => muteUnmute()}
                className="btn-round-xl bg-blur mr-3 z-index-1"
              >
                <i className="feather-mic-off text-white"></i>
              </button>
              <button
                onClick={() => startStream()}
                className="btn-xxl text-white start-stream-btn bg-danger z-index-1"
              >
                <i className="feather-play text-white"></i> Start
              </button>
              <button
                onClick={() => record()}
                className="btn-round-xl bg-blur ml-3 z-index-1"
              >
                <i className="ti-video-camera text-white"></i>
              </button>
            </>
          )}

          <span
            ref={playTime}
            className="p-2 bg-blur z-index-1 text-white fw-700 font-xssss rounded-lg right-15 position-absolute mb-4 bottom-0"
          >
            00:00
          </span>
        </div>
      </div>
    );
  }
);

export default VideoStreamPlayer;
