import React from "react";
import "./Categories.css";
type CategoryProps = {
  title: string;
  image: string;
};

export const Categories = ({ title, image }: CategoryProps) => {
  return (
    <div className="h-[543px] overflow-hidden z-0">
      <div
        className="h-full flex justify-center text-white align-middle text-center items-center parent transition-all hover:scale-125 duration-1000 cursor-pointer"
        style={{
          background: `url('/assets/${image}') center center`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <span className="bg-red-500 py-2 px-6 rounded-sm cursor-pointer block">
          {title}
        </span>
      </div>
    </div>
  );
};
