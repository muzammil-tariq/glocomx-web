import React from "react";

const StreamDetails = ({ data }: any) => {
    return (
        <div className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-4">
            <div className="row">
                <div className="col-9">
                    <h2 className="fw-700 font-md d-block lh-4 mb-2">{data?.title}</h2>
                    <small>{data?.description}</small>
                </div>
                <div className="col-3">
                    <a href="#" className="btn-round-md ml-3 mb-2 d-inline-block float-right rounded-lg bg-danger">
                        <i className="feather-bookmark font-sm text-white"></i>
                    </a>
                    <a
                        href="#"
                        className="btn-round-md ml-0 d-inline-block float-right rounded-lg bg-greylight"
                        id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="feather-share-2 font-sm text-grey-700"></i>
                    </a>
                    <div
                        className="dropdown-menu dropdown-menu-right p-3 border-0 shadow-xss"
                        aria-labelledby="dropdownMenu2"
                    >
                        <ul className="d-flex align-items-center mt-0 float-left">
                            <li className="mr-2">
                                <h4 className="fw-600 font-xss text-grey-900  mt-2 mr-3">Share: </h4>
                            </li>
                            <li className="mr-2">
                                <a href="#" className="btn-round-md bg-facebook">
                                    <i className="font-xs ti-facebook text-white"></i>
                                </a>
                            </li>
                            <li className="mr-2">
                                <a href="#" className="btn-round-md bg-twiiter">
                                    <i className="font-xs ti-twitter-alt text-white"></i>
                                </a>
                            </li>
                            <li className="mr-2">
                                <a href="#" className="btn-round-md bg-linkedin">
                                    <i className="font-xs ti-linkedin text-white"></i>
                                </a>
                            </li>
                            <li className="mr-2">
                                <a href="#" className="btn-round-md bg-instagram">
                                    <i className="font-xs ti-instagram text-white"></i>
                                </a>
                            </li>
                            <li className="mr-2">
                                <a href="#" className="btn-round-md bg-pinterest">
                                    <i className="font-xs ti-pinterest text-white"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">
                <b>{data?.host?.userName}</b>
            </span>
            <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
            {
                data?.tags.map((item:any) => {
                    return <span key={item.id} className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">{item.tagName}</span>
                })
            }
            
            <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
            <span className="font-xssss fw-700 text-primary d-inline-block ml-0 ">
                <b>Follow Author</b>
            </span>
        </div>
    );
};

export default StreamDetails;
