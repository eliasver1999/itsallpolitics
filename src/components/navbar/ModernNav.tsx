import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./PhoneNavbar.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { state } from "../../types/initial";
import { ApiKind } from "../../types/api";
type Props = {};
const starting = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.1, type: "linear", opacity: { duration: 1 } },
  },
  exit: {
    opacity: 0,
    transition: { delay: 0.1, type: "linear", opacity: { duration: 1.4 } },
  },
};
const variantMenu = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, type: "linear", y: { duration: 1 } },
  },
  exit: {
    y: "-100vh",
    transition: { delay: 0.1, type: "linear", y: { duration: 1 } },
  },
};
const variantImage1 = {
  hidden: {
    x: "-100vh",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.1, type: "linear", x: { duration: 1 } },
  },
  exit: {
    x: "-100vh",
    opacity: 0,
    transition: { delay: 0.1, type: "linear", x: { duration: 1 } },
  },
};
const variantImage2 = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, type: "linear", y: { duration: 1 } },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: { delay: 0.1, type: "linear", y: { duration: 1 } },
  },
};
const variantImage3 = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, type: "linear", y: { duration: 1 } },
  },
  exit: {
    y: "100vh",
    transition: { delay: 0.1, type: "linear", y: { duration: 1 } },
  },
};
const ModernNav = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { category } = useSelector((state: state) => state);
  return (
    <div className="relative z-30 ">
      <motion.button
        className=" fixed z-40 top-8 right-[17px]  space-y-1   items-center justify-center px-4 py-3 rounded-tl-sm rounded-bl-sm"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: "rgba(149, 68, 207,1)" }}
        initial={false}
      >
        <motion.div
          className="hamburger--top h-12"
          animate={{
            y: isOpen ? 6 : 0,
            rotate: isOpen ? 60 : 0,
          }}
          transition={{
            delay: 0.1,
            y: { duration: 0.1 },
            rotate: { duration: 0.5 },
            default: { ease: "linear" },
          }}
        ></motion.div>
        <motion.div
          className="hamburger--middle"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{
            delay: 0.1,
            opacity: { duration: 0.5 },

            default: { ease: "linear" },
          }}
        ></motion.div>
        <motion.div
          className="hamburger--bottom"
          animate={{
            y: isOpen ? -6 : 0,
            rotate: isOpen ? 120 : 0,
          }}
          transition={{
            delay: 0.1,
            y: { duration: 0.1 },
            rotate: { duration: 0.5 },
            default: { ease: "linear" },
          }}
        ></motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={` ${
              isOpen ? "fixed z-30" : "absolute z-0"
            }  top-0 right-0  w-screen h-screen grid grid-cols-3`}
            variants={starting}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="grid grid-cols-5 col-span-2">
              {category.map((cat, i) => {
                if (i === 0 && isOpen) {
                  return (
                    <motion.div
                      className="bg-red-500 col-span-3 relative flex justify-center"
                      style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${
                          ApiKind.IMAGE + cat.image.path
                        }) `,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      variants={variantImage1}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <NavLink
                        to={"/category/" + cat.id}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                        className={({ isActive }) =>
                          "text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16"
                        }
                      >
                        {cat.title}
                      </NavLink>
                    </motion.div>
                  );
                }
                if (i === 1 && isOpen) {
                  return (
                    <motion.div
                      className="bg-red-100 col-span-2 relative flex justify-center"
                      style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${
                          ApiKind.IMAGE + cat.image.path
                        }) `,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      variants={variantImage2}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key="eco"
                    >
                      <NavLink
                        to={"/category/" + cat.id}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                        className={({ isActive }) =>
                          ` text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16`
                        }
                      >
                        {cat.title}
                      </NavLink>
                    </motion.div>
                  );
                }
                if (i === 2 && isOpen) {
                  return (
                    <motion.div
                      className="bg-red-100 col-span-2 relative flex justify-center"
                      variants={variantImage1}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${
                          ApiKind.IMAGE + cat.image.path
                        }) `,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <NavLink
                        to={"/category/" + cat.id}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                        className={({ isActive }) =>
                          "text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16"
                        }
                      >
                        {cat.title}
                      </NavLink>
                    </motion.div>
                  );
                }
                if (i === 3 && isOpen) {
                  return (
                    <motion.div
                      className="bg-red-800 col-span-3 relative flex justify-center"
                      variants={variantImage3}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${
                          ApiKind.IMAGE + cat.image.path
                        }) `,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <NavLink
                        to={"/category/" + cat.id}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                        className={({ isActive }) =>
                          "text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16"
                        }
                      >
                        {cat.title}
                      </NavLink>
                    </motion.div>
                  );
                }
              })}
              {/* {isOpen && (
                <motion.div
                  className="bg-red-500 col-span-3 relative flex justify-center"
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${"/assets/politics2.jpg"}) `,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  variants={variantImage1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <NavLink
                    to="/category/ΠΟΛΙΤΙΚΗ"
                    style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                    className={({ isActive }) =>
                      "text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16"
                    }
                  >
                    ΠΟΛΙΤΙΚΗ
                  </NavLink>
                </motion.div>
              )}

              {isOpen && (
                <motion.div
                  className="bg-red-100 col-span-2 relative flex justify-center"
                  variants={variantImage1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${"/assets/international2.jpg"}) `,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <NavLink
                    to="/category/OIKONOMIA"
                    style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                    className={({ isActive }) =>
                      "text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16"
                    }
                  >
                    ΔΙΕΘΝΗ
                  </NavLink>
                </motion.div>
              )}

              {isOpen && (
                <motion.div
                  className="bg-red-800 col-span-3 relative flex justify-center"
                  variants={variantImage3}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${"/assets/society.jpeg"}) `,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <NavLink
                    to="/category/ΚΟΙΝΩΝΙΑ"
                    style={{ backgroundColor: "rgba(149, 68, 207,.3)" }}
                    className={({ isActive }) =>
                      "text-[#e4e4e6] text-2xl bg-indigo-400 rounded-lg p-2 absolute bottom-16"
                    }
                  >
                    ΚΟΙΝΩΝΙΑ
                  </NavLink>
                </motion.div>
              )} */}
            </motion.div>

            {isOpen && (
              <motion.div
                className="bg-gray-500 h-full"
                variants={variantMenu}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="h-full flex flex-col justify-center space-y-12 items-center bg-neutral-900">
                  <NavLink
                    onClick={() => setIsOpen(!isOpen)}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "underline decoration-[#9544cf]"
                          : "hover-underline-animation"
                      } text-[#e4e4e6] text-2xl w-1/3 text-center`
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
                            isActive
                              ? "underline decoration-[#9544cf]"
                              : "hover-underline-animation"
                          } text-[#e4e4e6] text-2xl w-1/3 text-center`
                        }
                      >
                        {cat.title}
                      </NavLink>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernNav;
