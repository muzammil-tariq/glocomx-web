import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Toolbar from "../../components/toolbar/Toolbar";
import { ScheduleService } from "../../services/ScheduleService";
import StreamCard from "../../components/StreamCard/StreamCard";

const ChannelRoute = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSchedules = () => {
    setLoading(true);
    ScheduleService.getLiveSession()
      .then((data) => {
        setSchedules(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <div className="main-content">
      <Toolbar />
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-4 mb-3">
              {/* <h2 className="fw-400 font-lg d-block mb-4">
                                Live <b> Sessions</b>{" "}
                            </h2> */}
              <div className="row">
                {schedules.map((item: any) => {
                  return (
                    <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
                      <StreamCard data={{ ...item, isHost: false }} />
                    </div>
                  );
                })}
                {loading && (
                  <div className="m-auto">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
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

export default ChannelRoute;
