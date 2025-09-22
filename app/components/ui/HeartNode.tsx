import { motion } from "framer-motion";

interface HeartNodeProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function HeartNode({ text = "Diego's Skills", onClick, className = "", style }: HeartNodeProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 1],
      }}
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
      style={style}
    >
      {/* Heart icon as container with gradient background */}
      <div
        className="relative flex items-center justify-center text-center"
        style={{
          width: "75px",
          height: "75px",
          flexShrink: 0,
        }}
      >
        {/* Custom SVG Heart with gradient fill from Figma */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="75" 
          height="75" 
          viewBox="0 0 93 81" 
          fill="none"
          className="relative"
          style={{
            flexShrink: 0,
          }}
        >
          <foreignObject x="-15.5" y="-19.5" width="124" height="112">
            <div style={{backdropFilter:"blur(12px)", clipPath:"url(#bgblur_0_376_264_clip_path)", height:"100%", width:"100%"}}></div>
          </foreignObject>
          <g filter="url(#filter0_d_376_264)" data-figma-bg-blur-radius="24">
            <path d="M46.5 68C46.5 68 9 47.9545 9 24.3295C9 19.203 11.0514 14.2865 14.703 10.6615C18.3545 7.0365 23.3071 5 28.4712 5C36.6166 5 43.5938 9.40642 46.5 16.4545C49.4062 9.40642 56.3834 5 64.5288 5C69.6929 5 74.6455 7.0365 78.297 10.6615C81.9486 14.2865 84 19.203 84 24.3295C84 47.9545 46.5 68 46.5 68Z" fill="url(#paint0_linear_376_264)" shapeRendering="crispEdges"/>
            <path d="M46.5 68C46.5 68 9 47.9545 9 24.3295C9 19.203 11.0514 14.2865 14.703 10.6615C18.3545 7.0365 23.3071 5 28.4712 5C36.6166 5 43.5938 9.40642 46.5 16.4545C49.4062 9.40642 56.3834 5 64.5288 5C69.6929 5 74.6455 7.0365 78.297 10.6615C81.9486 14.2865 84 19.203 84 24.3295C84 47.9545 46.5 68 46.5 68Z" stroke="url(#paint1_linear_376_264)" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"/>
          </g>
          <defs>
            <filter id="filter0_d_376_264" x="-15.5" y="-19.5" width="124" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_376_264"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_376_264" result="shape"/>
            </filter>
            <clipPath id="bgblur_0_376_264_clip_path" transform="translate(15.5 19.5)">
              <path d="M46.5 68C46.5 68 9 47.9545 9 24.3295C9 19.203 11.0514 14.2865 14.703 10.6615C18.3545 7.0365 23.3071 5 28.4712 5C36.6166 5 43.5938 9.40642 46.5 16.4545C49.4062 9.40642 56.3834 5 64.5288 5C69.6929 5 74.6455 7.0365 78.297 10.6615C81.9486 14.2865 84 19.203 84 24.3295C84 47.9545 46.5 68 46.5 68Z"/>
            </clipPath>
            <linearGradient id="paint0_linear_376_264" x1="9" y1="5" x2="85.8486" y2="7.34205" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FC6060" stopOpacity="0.5"/>
              <stop offset="1" stopColor="#FC6060" stopOpacity="0.25"/>
            </linearGradient>
            <linearGradient id="paint1_linear_376_264" x1="9.1" y1="5" x2="85.2998" y2="6.48626" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.25"/>
              <stop offset="1" stopColor="white" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        {/* Text positioned absolutely within the heart */}
        <span
          className="absolute text-white text-center font-general text-base font-medium whitespace-nowrap"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {text}
        </span>
      </div>
    </motion.div>
  );
}
