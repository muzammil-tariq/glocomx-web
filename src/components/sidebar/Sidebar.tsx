import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className="navigation scroll-bar">
            <div className="container pl-0 pr-0">
                <div className="nav-content">
                    <div className="nav-top">
                        <a href="index.html">
                            {/* <i className="feather-slack text-success display1-size mr-3 ml-3"></i> */}
                            <img src="./assets/images/logo.png" alt="logo" width={50} />
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl logo-text mb-0">
                                Glocomx.{" "}
                            </span>{" "}
                        </a>
                        <a href="#" className="close-nav d-inline-block d-lg-none">
                            <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700 text-dark ml-auto mr-2 "></i>
                        </a>
                    </div>
                    <div className="nav-caption fw-600 font-xssss text-grey-500">
                        <span>New </span>Feeds
                    </div>
                    <ul className="mb-3">
                        <li className="logo d-none d-xl-block d-lg-block"></li>
                        <li>
                            <a href="default.html" className="nav-content-bttn open-font" data-tab="chats">
                                <i className="feather-tv mr-3"></i>
                                <span>Course Feed</span>
                            </a>
                        </li>
                        <li>
                            <a href="default-follower.html" className="nav-content-bttn open-font" data-tab="friends">
                                <i className="feather-shopping-bag mr-3"></i>
                                <span>Followers</span>
                            </a>
                        </li>
                        <li>
                            <CustomLink to="/channel" className="nav-content-bttn open-font" data-tab="favorites">
                                <i className="feather-globe mr-3"></i>
                                <span>Explore Channel</span>
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink to="/stream" className="nav-content-bttn open-font" data-tab="favorites">
                                <i className="feather-play-circle mr-3"></i>
                                <span>My Stream</span>
                            </CustomLink>
                        </li>
                        <li className="flex-lg-brackets">
                            <a
                                href="default-user-profile.html"
                                data-tab="archived"
                                className="nav-content-bttn open-font"
                            >
                                <i className="feather-video mr-3"></i>
                                <span>Saved Course</span>
                            </a>
                        </li>
                    </ul>

                    <div className="nav-caption fw-600 font-xssss text-grey-500">
                        <span>Following </span>Author
                    </div>
                    <ul className="mb-3">
                        <li>
                            <a
                                href="default-author-profile.html"
                                className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                                data-tab="chats"
                            >
                                <img src="./assets/images/profile-4.png" alt="user" className="w40 mr-2" />
                                <span>Surfiya Zakir </span> <span className="circle-icon bg-success mt-3"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="default-author-profile.html"
                                className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                                data-tab="chats"
                            >
                                <img src="./assets/images/profile-2.png" alt="user" className="w40 mr-2" />
                                <span>Vincent Parks </span> <span className="circle-icon bg-warning mt-3"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="default-author-profile.html"
                                className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                                data-tab="chats"
                            >
                                <img src="./assets/images/profile-3.png" alt="user" className="w40 mr-2" />
                                <span>Richard Bowers </span> <span className="circle-icon bg-success mt-3"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="default-author-profile.html"
                                className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                                data-tab="chats"
                            >
                                <img src="./assets/images/profile-4.png" alt="user" className="w40 mr-2" />
                                <span>John Lambert </span> <span className="circle-icon bg-success mt-3"></span>
                            </a>
                        </li>
                    </ul>
                    <div className="nav-caption fw-600 font-xssss text-grey-500">
                        <span></span> Account
                    </div>
                    <ul className="mb-3">
                        <li className="logo d-none d-xl-block d-lg-block"></li>
                        <li>
                            <a href="default-settings.html" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                <i className="font-sm feather-settings mr-3 text-grey-500"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="default-analytics.html" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                <i className="font-sm feather-pie-chart mr-3 text-grey-500"></i>
                                <span>Analytics</span>
                            </a>
                        </li>
                        <li>
                            <a href="message.html" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                <i className="font-sm feather-message-square mr-3 text-grey-500"></i>
                                <span>Chat</span>
                                <span className="circle-count bg-warning mt-0">23</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;

function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match: any = useMatch({ path: resolved.pathname, end: false });

    return (
        <Link to={to} {...props} className={(match ? "active " : "") + props.className}>
            {children}
        </Link>
    );
}
