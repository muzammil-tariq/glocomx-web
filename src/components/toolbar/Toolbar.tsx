import React from "react";
import { ServerBasePoint } from "../../common/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { logout } from "../../redux/reducers/authReducer";

const Toolbar = () => {
    const userReduxState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
    };
    return (
        <div className="middle-sidebar-header bg-white">
            <button className="header-menu"></button>
            <form action="#" className="float-left header-search">
                <div className="form-group mb-0 icon-input">
                    <i className="feather-search font-lg text-grey-400"></i>
                    <input
                        type="text"
                        placeholder="Start typing to search.."
                        className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
                    />
                </div>
            </form>
            <ul className="d-flex ml-auto right-menu-icon">
                <li>
                    <a href="#">
                        <span className="dot-count bg-warning"></span>
                        <i className="feather-bell font-xl text-current"></i>
                    </a>
                </li>
                <li>
                    <a href="message.html">
                        <i className="feather-message-square font-xl text-current"></i>
                    </a>
                </li>

                <li>
                    <a href="default-user-profile.html">
                        {userReduxState.profilePic != "" ? (
                            <img src={ServerBasePoint + userReduxState.profilePic} alt="user" className="w40 mt--1" />
                        ) : (
                            <img src="./assets/images/female-profile.png" alt="user" className="w40 mt--1" />
                        )}

                        <div className="menu-dropdown p-3">
                            <h4 className="fw-700 font-xs mb-3">
                                {userReduxState.firstName + " " + userReduxState.lastName}
                            </h4>
                            <div
                                className="card bg-transparent-card w-100 border-0 rounded mb-0 p-3"
                                onClick={handleLogout}
                            >
                                <i className="feather-log-out  text-current"></i>
                                <h5 className="font-xsss text-grey-900 mb-1 ml-2 mt-0 fw-700 d-block">Logout</h5>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#" className="menu-search-icon">
                        <i className="feather-search text-grey-900 font-lg"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Toolbar;
