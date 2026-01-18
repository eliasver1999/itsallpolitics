import React, { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  content: string;
};

const TableOfContents = ({ content }: Props) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || "";
      const id = `heading-${index}`;
      
      // Add ID to heading for scrolling
      heading.id = id;
      
      items.push({ id, text, level });
    });

    setTocItems(items);

    // Update the actual content with IDs
    const updatedContent = tempDiv.innerHTML;
    // You would need to update the parent component's content here
    
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);

      const currentHeading = headingElements.find(heading => {
        if (!heading) return false;
        const rect = heading.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 0;
      });

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (tocItems.length < 3) return null; // Only show TOC for articles with 3+ headings

  return (
    <div className="bg-gray-50 rounded-lg p-4 sticky top-32">
      <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
        Περιεχόμενα
      </h4>
      <nav>
        <ul className="space-y-1">
          {tocItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left w-full py-1 px-2 rounded text-sm transition-colors ${
                  activeId === item.id
                    ? "bg-[#9544cf] text-white"
                    : "text-gray-600 hover:text-[#9544cf] hover:bg-gray-100"
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;