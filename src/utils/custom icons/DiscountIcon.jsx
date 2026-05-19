import React from "react";

const DiscountIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rounded square background */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Percentage slash */}
      <path
        d="M9 15L15 9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Top circle */}
      <circle
        cx="9"
        cy="9"
        r="1.5"
        fill={color}
      />

      {/* Bottom circle */}
      <circle
        cx="15"
        cy="15"
        r="1.5"
        fill={color}
      />
    </svg>
  );
};

export default DiscountIcon;