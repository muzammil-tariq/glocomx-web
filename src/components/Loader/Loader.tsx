import React from "react";

const Loader = () => {
    return (
        <svg
            width="64px"
            height="64px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="lds-rolling"
            style={{ background: "none" }}
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                ng-attr-stroke="{{config.color}}"
                ng-attr-stroke-width="{{config.width}}"
                ng-attr-r="{{config.radius}}"
                ng-attr-stroke-dasharray="{{config.dasharray}}"
                stroke="#ca9e2a"
                strokeWidth="5"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
                transform="rotate(315.987 50 50)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    calcMode="ease-in-out"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                    dur="0.5s"
                    begin="0s"
                    repeatCount="indefinite"
                ></animateTransform>
            </circle>
        </svg>
    );
};

export default Loader;
