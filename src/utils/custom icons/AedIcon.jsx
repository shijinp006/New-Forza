import React from "react";

const AedIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left vertical stem */}
      <path
        d="M20 10
           C23 13,24 17,24 22
           V42
           C24 47,23 51,20 54"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Outer D curve */}
      <path
        d="M24 10
           H34
           C50 10,58 20,58 32
           C58 44,50 54,34 54
           H24"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top horizontal line */}
      <path
        d="M12 27 H58"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Bottom horizontal line */}
      <path
        d="M12 37 H58"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AedIcon;