import React from "react";
import PropTypes from "prop-types";

const COLORS = {
  you: {
    fill: "#f3a93c",
    stroke: "#67411a"
  },
  other: {
    fill: "#d6d3ce",
    stroke: "#4c4a47"
  },
  employee: {
    fill: "#f3a93c",
    stroke: "#67411a"
  },
  sleeve: {
    fill: "#64c1ec",
    stroke: "#4e4945"
  }
};

const Hand = ({ owner }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 600" width={35}>
    <path
      d="M24.7,597.88C23.33,436,22.67,214,21.83,26.23c0-2.1-.79-7.25-.18-8.45S25.51,15.67,27.8,15s4.42-2.49,4.23-4C31.81,9.32,29.1,7.63,27.59,8a14.74,14.74,0,0,0-5.41,2.51C23.58,8.93,26.59,4,26,3.24c-1-1.19-3.76-1.34-6.32.22s-4,5.09-4.43,6.86c.06-2.4,0-5.75-1-6.83s-4-.66-5.14,1.1-.24,7.75.57,10.13c-1.12-1.42-3.05-3.63-4.38-4S1.7,12.22,2,14.1A10.72,10.72,0,0,0,6.62,20.9c2.93,2,5.67.63,6.28.58a94.36,94.36,0,0,1,.86,13.12c-.61,138.47-.75,411-1.55,563.54Z"
      style={{
        ...COLORS[owner],
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }}
    />
    {owner === "employee" && (
      <path
        d="M10.75,29c5.5,0,14-.5,14-.5-.25,87,1.75,499,2.5,570.25-9,.5-13.25-.25-19.5,0C9.25,477.75,11.75,71,10.75,29Z"
        style={{
          ...COLORS.sleeve,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }}
      />
    )}
  </svg>
);

Hand.propTypes = {
  owner: PropTypes.oneOf(["you", "other", "employee"]).isRequired
};

export default Hand;
