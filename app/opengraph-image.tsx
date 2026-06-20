import { ImageResponse } from "next/og";

import { business } from "@/lib/data/business";

export const runtime = "edge";
export const alt = "Rohit Furnitures — Quality Furniture in Salem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #2B2622 0%, #4A433D 100%)",
          color: "#F8F4EF",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 34, color: "#D19A6F", letterSpacing: 2 }}>
          {business.address.city.toUpperCase()}, TAMIL NADU
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            marginTop: 16,
            lineHeight: 1.1,
          }}
        >
          Rohit Furnitures
        </div>
        <div style={{ fontSize: 38, marginTop: 24, color: "#EFE7DC" }}>
          Quality furniture, honest prices.
        </div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#C17A4D" }}>
          Nilkamal · Sofas · Beds · Dining · Office
        </div>
      </div>
    ),
    { ...size }
  );
}
