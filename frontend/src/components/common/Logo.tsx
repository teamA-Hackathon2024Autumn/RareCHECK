export const Logo = () => {
  return (
    <svg viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_114_2"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="640"
        height="640"
        className="mask-type-luminance"
      >
        <path d="M640 0H0V640H640V0Z" fill="white"></path>
      </mask>
      <g mask="url(#mask0_114_2)">
        <rect width="640" height="640" fill="#FFFFFF" />
        <g transform="translate(80, 150)">
          <path
            d="
                  M 0 150
                  L 130 280
                  L 400 50
                  "
            stroke="#2B3C6F"
            strokeWidth="80"
            fill="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          />
          <circle cx="455" cy="0" r="40" fill="#FFD700" />
        </g>
        <text
          x="320"
          y="580"
          fontFamily="Arial, sans-serif"
          fontSize="100"
          fill="#2B3C6F"
          textAnchor="middle"
          fontWeight="bold"
        >
          RareCHECK
        </text>
      </g>
    </svg>
  );
};
