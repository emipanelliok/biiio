"use client";

interface BiiioLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const sizes = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export default function BiiioLogo({ size = "md", color }: BiiioLogoProps) {
  return (
    <span className={`font-black tracking-tighter uppercase ${sizes[size]} relative inline-block`} style={{ color: color || "#111" }}>
      B
      <span className="relative inline z-[1]">
        IIIO
        <span
          className="absolute left-[-3px] right-[-3px] bottom-[2px] h-[45%] z-[-1] rounded-[3px] biiio-marker"
          style={{ transform: "rotate(-1.5deg)" }}
        />
      </span>
    </span>
  );
}
