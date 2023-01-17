import React from "react";
import { NavLink } from "react-router-dom";
import "./PhoneNavbar.css";
import { motion } from "framer-motion";

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

  return (
    <>
      <div className="sticky top-0 bg-gray-50 z-10 overflow-hidden">
        <div className="flex justify-between items-center px-12">
          <div className=" py-4 ">
            <img src="/assets/logo.png" alt="logo" width={132} height={128} />
          </div>
          <button
            className="flex flex-col h-full space-y-1 cursor-pointer z-40 relative "
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              className="hamburger--top z-40"
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
            ></motion.div>
            <motion.div
              className="hamburger--middle"
              animate={{
                rotate: isOpen ? 140 : 0,
                y: isOpen ? 6 : 0,
                height: isOpen ? 2 : 1,
              }}
              transition={{
                delay: 0.05,

                default: { ease: "linear" },
              }}
            ></motion.div>
            <motion.div
              className="hamburger--bottom"
              animate={{
                rotate: isOpen ? 40 : 0,
                height: isOpen ? 2 : 1,
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
          className=" bg-gray-400 fixed  w-3/4 z-10 top-0 h-full p-32 right-0"
        >
          <h3>1</h3>
        </motion.nav>
      </div>
    </>
  );
};

export default PhoneNavbar;
