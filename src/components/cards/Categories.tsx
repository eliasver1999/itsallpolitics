import React from "react";
import { ApiKind } from "../../types/api";
import "./Categories.css";
import { motion } from "framer-motion";
type CategoryProps = {
  title: string;
  image: string;
  up: boolean;
};

export const Categories = ({ title, image, up }: CategoryProps) => {
  return (
    <div className="lg:h-[543px] h-[350px] overflow-hidden z-0 relative">
      <motion.div
        className="h-full flex justify-center text-white align-middle text-center items-center parent transition-all hover:scale-125 duration-1000 cursor-pointer"
        style={{
          background: `url(${ApiKind.IMAGE + image}) top center`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        initial={{ opacity: 0.3, y: up ? 600 : -600 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.1 },
        }}
        transition={{ type: "linear", duration: 0.4 }}
      ></motion.div>
      <div className="w-full absolute top-1/2 flex text-center justify-center">
        <span
          className=" py-2 px-6 rounded-sm cursor-pointer text-center text-slate-50"
          style={{ backgroundColor: "rgba(149, 68, 207,.8)" }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
