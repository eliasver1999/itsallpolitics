import React from "react";
import { tag } from "../../types/blog";
import { useNavigate } from "react-router-dom";

type Props = {
  tags: tag[];
  size?: "sm" | "md" | "lg";
  limit?: number;
};

const TagList = ({ tags, size = "md", limit }: Props) => {
  const navigate = useNavigate();
  
  const displayTags = limit ? tags.slice(0, limit) : tags;
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1", 
    lg: "text-base px-4 py-2"
  };

  const handleTagClick = (tag: tag) => {
    navigate(`/tag/${tag.slug}`);
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleTagClick(tag)}
          className={`${sizeClasses[size]} bg-gray-100 hover:bg-[#9544cf] hover:text-white text-gray-700 rounded-full transition-all duration-200 font-medium`}
        >
          #{tag.name}
        </button>
      ))}
      {limit && tags.length > limit && (
        <span className="text-gray-500 text-sm">+{tags.length - limit} περισσότερα</span>
      )}
    </div>
  );
};

export default TagList;