import React from "react";
import { NavLink } from "react-router-dom";
import "./PhoneNavbar.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { state } from "../../types/initial";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "200%" },
};
const topBar = {
  open: {},
};
type Props = {};

const PhoneNavbar = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<any>(null);
  const { category } = useSelector((state: state) => state);
  const setScroll = () => {
    setOffset(window.scrollY);
  };
  console.log(offset);
  React.useEffect(() => {
    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  });
  return (
    <div className="nav fixed top-0 w-screen  bg-gray-50 z-10 overflow-hidden min-h-[100px] h-[100px]">
      <div className="flex justify-between items-center px-12">
        <div className=" py-4 ">
          <img src="/assets/logo.png" alt="logo" width={132} height={128} />
        </div>
        <button
          className="flex flex-col h-full space-y-1 cursor-pointer z-40 relative "
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            className="hamburger--top z-40 "
            style={{ backgroundColor: "rgba(149, 68, 207,.9)" }}
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
          ></motion.div>
          <motion.div
            className="hamburger--middle "
            style={{ backgroundColor: "rgba(149, 68, 207,.9)" }}
            animate={{
              rotate: isOpen ? 140 : 0,
              y: isOpen ? 6 : 0,
              height: isOpen ? 2 : 2,
            }}
            transition={{
              delay: 0.05,

              default: { ease: "linear" },
            }}
          ></motion.div>
          <motion.div
            className="hamburger--bottom "
            style={{ backgroundColor: "rgba(149, 68, 207,.9)" }}
            animate={{
              rotate: isOpen ? 40 : 0,
              height: isOpen ? 2 : 2,
            }}
            transition={{
              delay: 0.05,

              default: { ease: "linear" },
            }}
          ></motion.div>
        </button>
      </div>
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        initial={false}
        transition={{
          delay: 0.05,

          default: { ease: "linear" },
        }}
        className=" bg-gray-400 fixed  w-full z-10 top-0 h-full"
      >
        <div className="flex justify-center items-center flex-col space-y-8 h-full text-xl">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "underlined" : "hover-underline-animation"
              } text-[#545e6f]`
            }
            to="/"
          >
            ΑΡΧΙΚΗ
          </NavLink>
          {category.map((cat) => {
            return (
              <NavLink
                to={"/category/" + cat.id}
                onClick={() => setIsOpen(!isOpen)}
                className={({ isActive }) =>
                  `${
                    isActive ? "underlined" : "hover-underline-animation"
                  } text-[#545e6f]`
                }
              >
                {cat.title}
              </NavLink>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
};

export default PhoneNavbar;
