import React from "react";

const sizes = {
  xs: {
    wordmark: "text-[13px]",
    sun: "w-[22px] h-[22px] text-[9px]",
    sunMl: "ml-[1px]",
  },
  sm: {
    wordmark: "text-[18px]",
    sun: "w-[32px] h-[32px] text-[12px]",
    sunMl: "ml-[1px]",
  },
  md: {
    wordmark: "text-[28px]",
    sun: "w-[50px] h-[50px] text-[18px]",
    sunMl: "ml-[2px]",
  },
  lg: {
    wordmark: "text-[42px]",
    sun: "w-[74px] h-[74px] text-[26px]",
    sunMl: "ml-[2px]",
  },
};

export default function Logo({ size = "md", variant = "on-dark" }) {
  const s = sizes[size];
  const wordmarkColor =
    variant === "on-light" ? "text-text-dark" : "text-white";

  return (
    <div className="inline-flex items-center leading-none">
      <span
        className={`font-display font-extrabold tracking-tight ${wordmarkColor} ${s.wordmark}`}
        style={{ letterSpacing: "-0.5px" }}
      >
        kartar
      </span>
      <span
        className={`inline-flex items-center justify-center rounded-full font-display font-extrabold text-white flex-shrink-0 ${s.sun} ${s.sunMl}`}
        style={{
          background:
            "radial-gradient(circle at 40% 38%, #FFAA70 0%, #FF7A35 40%, #FF5E0E 100%)",
          letterSpacing: "-0.5px",
        }}
      >
        AI
      </span>
    </div>
  );
}
