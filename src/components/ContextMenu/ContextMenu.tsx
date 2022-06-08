import React from "react";
import "./ContextMenuStyles.scss";

const ContextMenu = ({ data, isShown }: any) => {
  return (
    <div className={`menu-dropdown ${isShown && "menu-visible"}`}>
      {data.map((items: any) => {
        return (
          <div
            key={items.id}
            onClick={items.handleClick}
            className="card bg-transparent-card w-100 border-0 px-3 py-3 flex align-items-center"
          >
            <i className={`feather-${items.icon} text-grey-600 font-xs`}></i>
            <h5 className="font-xsss text-grey-800 mb-0 mt-0 fw-500 d-block ml-2">
              {items.name}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
