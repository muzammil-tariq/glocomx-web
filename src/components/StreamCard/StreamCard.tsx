import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServerBasePoint } from "../../common/constants";
import { ScheduleService } from "../../services/ScheduleService";
import ContextMenu from "../ContextMenu/ContextMenu";
import Loader from "../Loader/Loader";
import "./StreamCardStyles.scss";

const StreamCard = ({ data, deleteSuccess }: any) => {
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [contextMenuItems, setContextMenu] = useState([]) as any;
  const [isDeleteing, setIsDeleteing] = useState(false);

  const handleDelete = () => {
    setIsContextMenu(false);
    setIsDeleteing(true);
    ScheduleService.deleteSchedule(data.id)
      .then((response) => {
        setIsDeleteing(false);
        if (response.status == 204) {
          deleteSuccess(data.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id: number) => {
    alert("edit");
  };

  const showContextMenu = useCallback(() => {
    setIsContextMenu(!isContextMenu);
  }, [isContextMenu]);

  useEffect(() => {
    setContextMenu([
      {
        id: 1,
        icon: "edit-2",
        name: "Edit",
        handleClick: handleEdit,
      },
      {
        id: 2,
        icon: "trash-2",
        name: "Delete",
        handleClick: handleDelete,
      },
    ]);
  }, []);

  return (
    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
      {data.isHost && (
        <button
          onClick={showContextMenu}
          className="position-absolute right-0 bg-white mr-4 top-0 mt-3"
        >
          <i className="ti-more text-grey-500 font-xs"></i>
        </button>
      )}

      <a
        href="#"
        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
      >
        {data?.thumbnail == null ? (
          <img src="./assets/images/logo.png" width="100%" alt="icon" />
        ) : (
          <img
            src={ServerBasePoint + data?.thumbnail}
            width="100%"
            alt="icon"
          />
        )}
      </a>
      <h4 className="fw-700 font-xs mt-4">{data?.title}</h4>

      <p className="fw-500 font-xssss text-grey-500 mt-2 mb-1">
        {data.description}
      </p>

      <div className="clearfix"></div>

      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-default d-inline-block text-default mb-1 mr-1">
        {moment(data.startTime).format("MMM Do, h:mm a")}
      </span>
      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-default d-inline-block text-default mb-1 mr-1">
        {moment(data.endTime).format("MMM Do, h:mm a")}
      </span>

      <div className="clearfix"></div>

      {data.tags.map((tag: any) => {
        return (
          <span
            key={tag.id}
            className="font-xsssss fw-700 pl-2 pr-2 lh-26 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1"
          >
            {tag.tagName}
          </span>
        );
      })}

      <div className="clearfix"></div>
      {/* <ul className="memberlist mt-4 mb-2">
                <li>
                    <a href="#">
                        <img src="./assets/images/user-6.png" alt="user" className="w30 d-inline-block" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./assets/images/user-7.png" alt="user" className="w30 d-inline-block" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./assets/images/user-8.png" alt="user" className="w30 d-inline-block" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./assets/images/user-3.png" alt="user" className="w30 d-inline-block" />
                    </a>
                </li>
                <li className="last-member">
                    <a href="#" className="bg-greylight fw-600 text-grey-500 font-xssss ls-3">
                        +2
                    </a>
                </li>
                <li className="pl-4 w-auto">
                    <a href="#" className="fw-500 text-grey-500 font-xssss">
                        Student apply
                    </a>
                </li>
            </ul> */}

      <Link
        to={data.id + "/" + data.liveSessionId + ""}
        className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current"
      >
        {data.isHost ? (
          <i className="feather-wifi text-white-500 mr-2"></i>
        ) : (
          <i className="feather-video text-white-500 mr-2"></i>
        )}
        {data.isHost ? "START STREAMING" : "WATCH"}
      </Link>

      <ContextMenu isShown={isContextMenu} data={contextMenuItems} />
      {isContextMenu && (
        <div className="fallback" onClick={showContextMenu}></div>
      )}

      {isDeleteing && (
        <div className="wrp-loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default StreamCard;
