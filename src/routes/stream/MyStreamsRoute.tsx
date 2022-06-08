import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Toolbar from "../../components/toolbar/Toolbar";
import { ScheduleService } from "../../services/ScheduleService";
import StreamCard from "../../components/StreamCard/StreamCard";
import { useAppSelector } from "../../redux/hooks/hooks";

const MyStreamsRoute = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);

    const authRedux = useAppSelector((state) => state.auth);

    const getSchedules = () => {
        setLoading(true);

        ScheduleService.getLiveSession(authRedux.userId)
            .then((data) => {
                setSchedules(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSuccessDelete = useCallback(
        (id: number) => {
            let newSch = [...schedules];
            let findIndex = newSch.findIndex((sh: any) => sh.id == id);
            newSch.splice(findIndex, 1);

            setSchedules(newSch);
        },
        [loading, setSchedules]
    );
    useEffect(() => {
        getSchedules();
    }, []);

    return (
        <div className="main-content">
            <Toolbar />
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div
                                className="card rounded-xxl p-lg--3 border-0 bg-no-repeat bg-image-contain banner-wrap"
                                style={{ backgroundImage: "url(images/fogg-clip.png);" }}
                            >
                                <div className="card-body p-4">
                                    <h2 className="display2-size mb-0 fw-400 display2-md-size sm-mt-7 sm-pt-10">
                                        Schedule <b>Live Streams</b>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 pt-4 mb-3">
                            <h2 className="fw-400 font-lg d-block mb-4 d-flex align-items-center">
                                Live <b> Sessions</b>{" "}
                                <Link
                                    to="add"
                                    className="btn text-white bg-current rounded d-block ml-auto rounded px-4 px-2 py-2"
                                >
                                    <i className="feather-plus text-white-500 mr-2"></i>
                                    Schedule New Stream
                                </Link>
                            </h2>
                            <div className="row">
                                {schedules.map((item: any) => {
                                    return (
                                        <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
                                            <StreamCard
                                                deleteSuccess={handleSuccessDelete}
                                                data={{ ...item, isHost: true }}
                                            />
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

                        {/* <div className="col-lg-12 pt-0 mb-3">
                            <h2 className="fw-400 font-lg d-block">
                                My <b> Courses</b>{" "}
                                <button className="float-right btn btn-primary rounded px-4 px-2">
                                    <i className="feather-plus text-white-500 mr-2"></i>
                                    Add New Course
                                </button>
                            </h2>
                        </div> */}
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

export default MyStreamsRoute;
