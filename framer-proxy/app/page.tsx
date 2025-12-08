"use client";

import React from "react";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function HomePage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://vyoumportfolio.framer.website"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        allow="fullscreen"
      />

      <div
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 14px",
          background: "rgba(12, 12, 12, 0.9)",
          color: "#fff",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
          zIndex: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Connect</span>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.85rem",
                padding: "6px 10px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
