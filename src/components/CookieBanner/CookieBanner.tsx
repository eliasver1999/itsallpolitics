// CookieBanner.jsx
import React, { useEffect, useState } from "react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);

    // OPTIONAL: Here you could trigger Google Analytics initialization
    // if you're loading it conditionally based on consent.
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);

    // OPTIONAL: Disable GA / don’t load analytics scripts here
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "1rem 1.5rem",
        backgroundColor: "#ac47f5",
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        zIndex: 1000,
        fontSize: "0.9rem",
      }}
    >
      <p style={{ margin: 0, maxWidth: "600px", lineHeight: 1.4 }}>
        We use cookies and similar technologies to analyze traffic and improve
        your experience. By clicking “Accept”, you agree to the storing of
        cookies on your device. For more information, see our{" "}
        <a
          href="/privacy-policy"
          style={{ color: "#93c5fd", textDecoration: "underline" }}
        >
          Privacy Policy
        </a>
        .
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleDecline}
          style={{
            background: "transparent",
            border: "1px solid #e5e7eb",
            color: "white",
            padding: "0.4rem 0.9rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: "white",
            border: "none",
            color: "black",
            padding: "0.4rem 0.9rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
