"use client";

import React from "react";

export default function HomePage() {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="https://vyoumportfolio.framer.website"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        allow="fullscreen"
      />
    </div>
  );
}