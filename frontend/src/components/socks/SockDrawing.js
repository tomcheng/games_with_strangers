import React from "react";
import PropTypes from "prop-types";

const COLORS = {
  1: {
    fill: "#da5534",
    stroke: "#91382d"
  },
  2: {
    fill: "#f4c537",
    stroke: "#7f5a3d"
  },
  3: {
    fill: "#9bd098",
    stroke: "#3f4426"
  }
};

const SVG_PROPS = {
  1: {
    viewBox: "0 0 53 44",
    width: 53
  },
  2: {
    viewBox: "0 0 64 86",
    width: 64
  },
  3: {
    viewBox: "0 0 71 136",
    width: 71
  }
};

const PATHS = {
  1: "M25.23,40.15c8.64-1.87,18.77-6.78,21.64-9.69S50,17.62,50,11.17c-.12-3.57-.46-8.82-2.83-9.27C45.7,1.61,44.54,3.71,44,5.07a4.64,4.64,0,0,0-3-2.61c-1.84-.31-3.15,1.79-3.73,3a6.72,6.72,0,0,0-4-3c-2-.39-4.3,2.92-4.68,5.34-1.13,7.31-2.52,10.84-6.7,13.4s-17.65,5.12-19,8.28-1,8.11,1.1,9.71S17.2,41.9,25.23,40.15Z",
  2: "M29,80.93C46.13,76.47,50,73.16,52.35,70S54.82,63.35,55,60c.29-4.29-.18-6.91,1.19-16.73S59.58,25.7,61,18.5c2-10.17.48-15.38-2.09-15.82s-6,1.92-6.76,4.41C51.8,4.49,50.29,1.82,48.44,2S44.7,4.64,44.16,7.16c-.8-2.63-3-5.46-5.27-5S35.36,8,35,17s.48,14.17-1.33,24.3S27.48,58.67,21.58,62.2a90.71,90.71,0,0,1-15.5,6.89,7.43,7.43,0,0,0-4.34,8.37c.71,4.05,6.59,6.79,11.13,6.55S23,82.51,29,80.93Z",
  3: "M28.34,131c10-2.28,18.42-4.9,23.26-10.37s3.7-12,3.73-18c0-8.72,3.77-29,5.67-45s4.39-24.32,5.38-30.28c2-11.72,2.4-17.29,1.93-19.87S67,3.6,65.9,3.38,63.41,4.6,62.82,5.56c-1-2.35-2.42-4-4.39-3.6s-3.45,2-4.62,3.9c-1.43-2.28-3-3.51-4.62-3.47a4.86,4.86,0,0,0-3.69,2.54,3.8,3.8,0,0,0-4.94-1.55c-1.45.86-4.54,6.17-5,14s-.87,26.06-.68,39.08.41,33.64-2,40.86a30.2,30.2,0,0,1-10.89,15c-4,2.94-13.18,6.23-16.22,7.64s-4.39,5.63-3.54,8.87S6.78,134,11,134,22.65,132.29,28.34,131Z"
};

const PATTERNS = {
  1: {
    1: "M50.13,11.88,47.88,9.13l-3,3.5L42.25,8.88l-4.12,3.25-2.5-3.5-3.87,3.25-3.5-3.75m-1,5.38,3.38,3.25,4.25-2.62,2.88,3.38,3.88-3,2.5,3,3.5-2.75,2,2.5",
    2: "M49.5,9.75c-7.25,0-16.5,0-21-.5M27,14.5c5,.75,15,1.5,22.75,2.25m-1.25,8.5C42,22.75,30.75,19.5,26,17.75m-2,2C27,22,39.5,29.38,43.75,32.38M22,21.25c3.25,3.5,10.25,11.25,14.25,15.25m-17-13.75a127,127,0,0,0,8.25,16.5M14.25,24c1.75,6.75,3,12,4.5,16.75M8,26.25c1,5.5,1.25,10,2.5,14",
    3: "M43,4.13c-6.5,7-27.62,28-35.87,36.25m3.13.5C18.5,32.63,42,10.25,48.5,3.25M25,40.38c8.25-8.25,18.38-18.12,24.88-25.12M37.38,5c6.5,7,4.25,4.25,12.5,12.5m-21.5-7.25c6.5,7,11.13,10.75,19.38,19m-20-16c6.5,7,10.25,9.63,18.5,17.88M22.5,21c6.5,7,7,7,15.25,15.25M12.13,25c6.5,7,6.5,6.13,14.75,14.38M9.25,26.25c6.5,7,6.13,6,14.38,14.25M2.38,32.13c6.5,7,.88.75,9.13,9"
  },
  2: {
    1: "M35,15.75l3.38-3.62L41,15.88l3.5-3.37,3,4.13,4-3.62,1.88,4.38,3.75-3.12,1.75,3.25,2.25-2.12m-1.25,7.25-1.5,1.13-2.12-2.62L52.88,23.5,50.25,20l-3.12,2.75-3-4.12-3,3.5-3-4.25-3.25,3",
    2: "M35.5,10.5c5.75.5,18.75,1,26,1.75M35,17.5c6.25.5,18.5,1.5,25.5,1.75m-25.75,5c6.5.5,18.5,1.25,24.75,1.5M58,32.25c-6.75-.5-15-1-23.25-1.5m-.25,5.5C41.25,37,51.25,38.5,56.25,39m-.75,6.25c-5.75-.75-15.75-2.25-22-3m-1.75,5.5c6.75,1.5,18.25,3.5,23,4.5m-24.5,0c6.25,2.25,18,5.5,24.5,7.5M53,68c-6.75-3.5-19-10.75-24-13.25M27,57c4,4.25,13.25,13.25,18.5,18.25M36,78.5c-2.25-4.5-8.75-12.75-12.25-18M19,63.25c2.25,5,7.75,15,9,17.75m-8.25,1.5c-.75-2.75-3.25-11-5.25-16.75M8.5,68c.75,3.5,3,11.25,4.25,15.5",
    3: "M50.88,4.13c-6.5,7-7.5,7.5-15.75,15.75m0,3c8.25-8.25,10.25-9.62,16.75-16.62M34.5,37.5c8.25-8.25,21.13-20.12,27.63-27.12M6.88,82.88C15.13,74.63,51.63,38.5,58.13,31.5M9.63,83.88c8.25-8.25,41.13-40.25,47.63-47.25M25,81.75c8.25-8.25,23.63-22.87,30.13-29.87m-8.37-49c6.5,7,6.38,6,14.63,14.25M45.38,4.5c6.5,7,7.13,6.75,15.38,15M35.88,8.5c6.5,7,14.25,13.25,22.5,21.5M35,25c6.5,7,12.63,12.88,20.88,21.13M35.13,28.75c6.5,7,12,12.13,20.25,20.38M33.75,41c6.5,7,13.13,12.75,21.38,21M30.38,52.25c6.5,7,12,11.63,20.25,19.88M29,54.5c6.5,7,11.13,10.75,19.38,19m-25.25-12c6.5,7,7.88,8.13,16.13,16.38M13.13,66c6.5,7,7.13,7,15.38,15.25m-18.25-14c6.5,7,6.25,6.25,14.5,14.5m-22-9.25c6.5,7,3.25,2.75,11.5,11"
  },
  3: {
    1: "M36,16.17l4.33-4.5,2.83,5,4.33-4.33,2,4.67L54,12.67,56.67,18l4-5,2.5,4.83,3-4.17L68,16.38M66.88,23,65.5,20.67l-3.33,4.17-2.33-5.17L55.5,24.83,52.83,20l-3.67,4-2.83-4.83-4,5-3-5.5L35.5,22.83",
    2: "M68.25,13.5c-6.75,0-26.87-1.25-31.87-1.87m-.87,7c7.5.63,21.25,1.13,31.75,1.5m-1,7.13c-9.5-.5-23.87-1-30.87-1m-.5,7c5.88,0,18.63.63,29.88.75M35,40.63c9,.25,18,.13,28.5-.25m-1.25,6.75c-9-.25-19.62.25-27.75.13M61.13,54c-6.87-.12-20.62.5-26.12.5m25.38,6.38c-8.75-.5-18.75.38-25.5.38m24.5,7c-6.62-.25-17.75.13-24.5.25m0,6.63c6.88.38,16.25-.37,23.5,0M34.63,82c8.63.38,15.13.63,22.63.5m-.75,7.38c-7.75-.37-15.75-1-22.12-1.12M33.13,95.5c6.25.75,15.5,1.25,22.13,1.88M55,104.63c-6.12-2.25-16-3.12-23-4.75m14.5,24.38c-3-4.12-13.12-14.12-17.5-18.75m-3.12,3.88c2.25,5.25,9.25,15.5,11.25,19.38M20.5,113.25c2,5.13,5.88,15.13,7,17.63M14.25,116.5c1.5,4.13,4.38,13.88,5.63,16.13M12.63,134c-.25-1.75-3-12.37-3.62-15.37M30.75,103c5.25,3,18.5,10,23.5,12.75",
    3: "M66.75,4.13c-6.5,7-23.37,23.25-31.62,31.5M34.88,40c8.25-8.25,26.5-26.5,33-33.5m-33,47.25c8.25-8.25,26-25.12,32.5-32.12M35.63,18.5C43.88,10.25,44.5,9.88,51,2.88m-15.87,68c8.25-8.25,21.63-21.12,28.13-28.12M35.13,73.88c8.25-8.25,21-19.5,27.5-26.5M34.5,88.5c8.25-8.25,19.38-18.75,25.88-25.75M7.25,133.5C15.5,125.25,51,90.25,57.5,83.25M10.88,134.13C19.13,125.88,50.25,95,56.75,88M26.5,131.38c8.25-8.25,22.13-21.5,28.63-28.5M37.5,8c6.5,7,19,19,27.25,27.25M36.5,11c6.5,7,19,19,27.25,27.25M35.5,23.13c6.5,7,18.38,18.25,26.63,26.5m-13.37-47c6.5,7,10.38,10.13,18.63,18.38M35,40.88c6.5,7,16.75,16.75,25,25M34.88,44.5c6.5,7,16.63,16.5,24.88,24.75M35.13,58C41.63,65,49.75,72.38,58,80.63M35,76c6.5,7,12.63,12.88,20.88,21.13M35.13,79.75c6.5,7,12,12.13,20.25,20.38m-21.12-8c6.5,7,12.63,12.63,20.88,20.88m-24.75-9.75c6.5,7,11.25,11,19.5,19.25M29,105.5c6.5,7,10.25,10,18.5,18.25m-25-11.87c6.5,7,8,8.13,16.25,16.38M13.13,117c6.5,7,6.5,6.13,14.75,14.38M10.25,118.25c6.5,7,5.5,5.38,13.75,13.63M2.75,123.5c6.5,7,2.5,2.25,10.75,10.5"
  }
};

const SockDrawing = ({ color, length, pattern }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...SVG_PROPS[length]}>
    <path
      d={PATHS[length]}
      style={{ ...COLORS[color], strokeLinejoin: "round" }}
    />
    <path
      d={PATTERNS[length][pattern]}
      style={{
        fill: "none",
        stroke: COLORS[color].stroke,
        strokeLinejoin: "round"
      }}
    />
  </svg>
);

SockDrawing.propTypes = {
  color: PropTypes.oneOf([1, 2, 3]).isRequired,
  length: PropTypes.oneOf([1, 2, 3]).isRequired,
  pattern: PropTypes.oneOf([1, 2, 3]).isRequired
};

export default SockDrawing;
