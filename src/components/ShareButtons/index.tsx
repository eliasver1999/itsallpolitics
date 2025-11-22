// ShareButtons.tsx
import React from "react";

type ShareButtonsProps = {
  url: string;
  title: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
      alert("Could not copy the link, please copy it manually.");
    }
  };

  const buttonStyle: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: "999px",
    padding: "0.3rem 0.7rem",
    fontSize: "0.8rem",
    cursor: "pointer",
    background: "white",
    textDecoration: "none",
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
      >
        Facebook
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
      >
        LinkedIn
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
      >
        X / Twitter
      </a>

      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
      >
        WhatsApp
      </a>

      <button type="button" onClick={handleCopyLink} style={buttonStyle}>
        Copy link
      </button>
    </div>
  );
};

export default ShareButtons;
