// ShareButtons.tsx
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
  FaCheck,
} from "react-icons/fa";
import { instance } from "../../axios/axiosInstance";

interface ShareButtonsProps {
  blogId: number | string;
  blogTitle: string;
}

/**
 * The share links point at the Laravel share endpoint
 * (`/api/blog/share/{id}`), NOT the React route. That endpoint serves
 * server-rendered Open Graph / Twitter meta tags (title, description, image)
 * so Facebook / LinkedIn / X crawlers get a rich preview, then redirects real
 * visitors to the article. The base URL follows the single axios config, so it
 * works the same locally and in production.
 */
const ShareButtons: React.FC<ShareButtonsProps> = ({ blogId, blogTitle }) => {
  const [copied, setCopied] = useState(false);

  // Crawlers (Facebook/LinkedIn) must be able to reach this URL from the public
  // internet, so localhost will NOT produce a preview. When testing locally
  // through a tunnel (ngrok etc.), set REACT_APP_SHARE_BASE to the public API
  // base, e.g. "https://abc123.ngrok-free.app/api". Otherwise it follows axios.
  const apiBase = (
    process.env.REACT_APP_SHARE_BASE ||
    instance.defaults.baseURL ||
    ""
  ).replace(/\/+$/, "");
  const shareUrl = `${apiBase}/blog/share/${blogId}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blogTitle);

  const openPopup = (url: string) => {
    window.open(url, "shareWindow", "width=600,height=540,noopener,noreferrer");
  };

  const networks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      bg: "bg-[#1877F2] hover:bg-[#0f63d6]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: <FaTwitter />,
      bg: "bg-black hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      bg: "bg-[#0A66C2] hover:bg-[#08538f]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-HTTPS) — no-op
    }
  };

  return (
    <div className="flex items-center gap-3 my-4">
      <span className="text-sm font-semibold text-gray-600">Κοινοποίηση:</span>
      <div className="flex items-center gap-2">
        {networks.map((n) => (
          <button
            key={n.name}
            type="button"
            aria-label={`Κοινοποίηση στο ${n.name}`}
            title={`Κοινοποίηση στο ${n.name}`}
            onClick={() => openPopup(n.url)}
            className={`${n.bg} text-white w-9 h-9 flex items-center justify-center rounded-full transition-colors`}
          >
            {n.icon}
          </button>
        ))}
        <button
          type="button"
          aria-label="Αντιγραφή συνδέσμου"
          title={copied ? "Αντιγράφηκε!" : "Αντιγραφή συνδέσμου"}
          onClick={copyLink}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
        >
          {copied ? <FaCheck className="text-green-600" /> : <FaLink />}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
