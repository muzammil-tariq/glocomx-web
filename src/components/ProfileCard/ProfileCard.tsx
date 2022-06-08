import React from "react";
import { ServerBasePoint } from "../../common/constants";
import { useAppSelector } from "../../redux/hooks/hooks";

const ProfileCard = () => {
    const userReduxState = useAppSelector((state) => state.auth);
    return (
        <div className="card overflow-hidden subscribe-widget p-3 mb-3 rounded-xxl border-0">
            <div
                className="card-body p-2 d-block text-center bg-no-repeat bg-image-topcenter"
                style={{ backgroundImage: "url(./assets/images/user-pattern.png)" }}
            >
                <a
                    href="#"
                    className="position-absolute right-0 mr-4"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i className="feather-edit text-grey-500 font-xs"></i>
                </a>
                <div
                    className="dropdown-menu dropdown-menu-right p-4 rounded-xxl border-0 shadow-lg"
                    aria-labelledby="dropdownMenu2"
                >
                    <div className="card-body p-0 d-flex">
                        <i className="feather-bookmark text-grey-500 mr-3 font-lg"></i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 mr-4">
                            Save Link{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                Add this to your saved items
                            </span>
                        </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-alert-circle text-grey-500 mr-3 font-lg"></i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 mr-4">
                            Hide Post{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                Save to your saved items
                            </span>
                        </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-alert-octagon text-grey-500 mr-3 font-lg"></i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 mr-4">
                            Hide all from Group{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                Save to your saved items
                            </span>
                        </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-lock text-grey-500 mr-3 font-lg"></i>
                        <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 mr-4">
                            Unfollow Group{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                Save to your saved items
                            </span>
                        </h4>
                    </div>
                </div>
                <figure className="avatar ml-auto mr-auto mb-0 mt-2 w90">
                    {userReduxState.profilePic != "" ? (
                        <img
                            src={ServerBasePoint + userReduxState.profilePic}
                            alt="user"
                            className="float-right shadow-sm rounded-circle w-100"
                        />
                    ) : (
                        <img
                            src="./assets/images/female-profile.png"
                            alt="user"
                            className="float-right shadow-sm rounded-circle w-100"
                        />
                    )}
                </figure>
                <div className="clearfix"></div>
                <h2 className="text-black font-xss lh-3 fw-700 mt-3 mb-1">
                    {userReduxState.firstName + " " + userReduxState.lastName}
                </h2>
                <h4 className="text-grey-500 font-xssss mt-0">
                    <span className="d-inline-block bg-success btn-round-xss m-0"></span> Available
                </h4>
                <div className="clearfix"></div>
                <div className="col-12 text-center mt-4 mb-2">
                    <a href="message.html" className="p-0 ml-1 btn btn-round-md rounded-xl bg-lightblue">
                        <i className="text-current ti-comment-alt font-sm"></i>
                    </a>
                    <a href="login.html" className="p-0 ml-1 btn btn-round-md rounded-xl bg-lightblue">
                        <i className="text-current ti-lock font-sm"></i>
                    </a>
                    <a
                        href="#"
                        className="p-0 btn p-2 lh-24 w100 ml-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                    >
                        FOLLOW
                    </a>
                </div>
                <ul className="list-inline border-0 mt-4">
                    <li className="list-inline-item text-center mr-4">
                        <h4 className="fw-700 font-md">
                            500+ <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Connections</span>
                        </h4>
                    </li>
                    <li className="list-inline-item text-center mr-4">
                        <h4 className="fw-700 font-md">
                            88.7 k <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Follower</span>
                        </h4>
                    </li>
                    <li className="list-inline-item text-center">
                        <h4 className="fw-700 font-md">
                            1,334 <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Followings</span>
                        </h4>
                    </li>
                </ul>

                {/* <div className="col-12 pl-0 mt-4 text-left">
                    <h4 className="text-grey-800 font-xsss fw-700 mb-3 d-block">
                        My Skill{" "}
                        <a href="#">
                            <i className="ti-angle-right font-xsssss text-grey-700 float-right "></i>
                        </a>
                    </h4>
                    <div className="carousel-card owl-carousel owl-theme overflow-visible nav-none">
                        <div className="item">
                            <a href="#" className="btn-round-xxxl border bg-greylight">
                                <img src="./assets/images/download1.png" alt="icon" className="p-3" />
                            </a>
                        </div>
                        <div className="item">
                            <a href="#" className="btn-round-xxxl border bg-greylight">
                                <img src="./assets/images/download2.png" alt="icon" className="p-3" />
                            </a>
                        </div>
                        <div className="item">
                            <a href="#" className="btn-round-xxxl border bg-greylight">
                                <img src="./assets/images/download4.png" alt="icon" className="p-3" />
                            </a>
                        </div>
                        <div className="item">
                            <a href="#" className="btn-round-xxxl border bg-greylight">
                                <img src="./assets/images/download3.png" alt="icon" className="p-3" />
                            </a>
                        </div>
                        <div className="item">
                            <a href="#" className="btn-round-xxxl border bg-greylight">
                                <img src="./assets/images/download1.png" alt="icon" className="p-3" />
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ProfileCard;
