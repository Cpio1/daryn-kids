import { ImageResponse } from "next/og";

export const alt = "Daryn — kindergarten in Almaty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: "linear-gradient(135deg, #FFF9ED 0%, #D4F0FC 55%, #FFE3DA 100%)",
          color: "#25324A",
        }}
      >
        <svg width="300" height="300" viewBox="0 0 64 64">
          {rays.map((deg, i) => (
            <rect key={deg} x="29.4" y={i % 2 ? 3 : 1.5} width="5.2" height={i % 2 ? 8 : 10} rx="2.6" fill={i % 2 ? "#FF9F43" : "#FFC83D"} transform={`rotate(${deg} 32 32)`} />
          ))}
          <circle cx="32" cy="32" r="18" fill="#FFD65A" />
          <circle cx="25.5" cy="29" r="2.4" fill="#25324A" />
          <circle cx="38.5" cy="29" r="2.4" fill="#25324A" />
          <circle cx="21" cy="35.5" r="3" fill="#FFBDAB" />
          <circle cx="43" cy="35.5" r="3" fill="#FFBDAB" />
          <path d="M26 36.5 Q32 43 38 36.5" stroke="#25324A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -4, display: "flex" }}>
            Dar<span style={{ color: "#3FB4E6" }}>y</span>n
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#4D5A73" }}>Kindergarten · Almaty</div>
        </div>
      </div>
    ),
    size,
  );
}
