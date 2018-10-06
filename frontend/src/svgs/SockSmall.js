import React from "react";
import colors from "./sockColors";

const SockSmall = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 44" width={53}>
    <path
      d="M25.23,40.15c8.64-1.87,18.77-6.78,21.64-9.69S50,17.62,50,11.17c-.12-3.57-.46-8.82-2.83-9.27C45.7,1.61,44.54,3.71,44,5.07a4.64,4.64,0,0,0-3-2.61c-1.84-.31-3.15,1.79-3.73,3a6.72,6.72,0,0,0-4-3c-2-.39-4.3,2.92-4.68,5.34-1.13,7.31-2.52,10.84-6.7,13.4s-17.65,5.12-19,8.28-1,8.11,1.1,9.71S17.2,41.9,25.23,40.15Z"
      style={{ ...colors[color], strokeLinejoin: "round" }}
    />
  </svg>
);

export default SockSmall;
