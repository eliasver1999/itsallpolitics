// ShareButtons.tsx
import React from "react";

interface ShareButtonsProps {
  blogId: number | string;
  blogTitle: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ blogId, blogTitle }) => {
  // Laravel share route
  const shareUrl = `https://katelin-famished-crisply.ngrok-free.dev/blog/share/${blogId}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blogTitle);

  const openPopup = (url: string) => {
    window.open(url, "shareWindow", "width=600,height=400,noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    openPopup(url);
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    openPopup(url);
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    openPopup(url);
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
    openPopup(url);
  };

  return (
    <div className="share-buttons flex gap-2">
      <button
        onClick={shareOnFacebook}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Facebook
      </button>
      <button
        onClick={shareOnTwitter}
        className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
      >
        Twitter
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-900"
      >
        LinkedIn
      </button>
      <button
        onClick={shareOnWhatsApp}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        WhatsApp
      </button>
    </div>
  );
};

export default ShareButtons;
