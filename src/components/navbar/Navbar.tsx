import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="grid grid-cols-4 px-32 sticky top-0 bg-white z-10">
      <div className=" py-4">
        <img src="/assets/logo.png" alt="logo" width={132} height={128} />
      </div>
      <div className="col-span-3 flex justify-center gap-8 items-center font-mono">
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
        <NavLink
          to="/category/ΠΟΛΙΤΙΚΗ"
          className={({ isActive }) =>
            `${
              isActive ? "underlined" : "hover-underline-animation"
            } text-[#545e6f]`
          }
        >
          ΠΟΛΙΤΙΚΗ
        </NavLink>
        <NavLink
          to="/category/ΔΙΕΘΝΗ"
          className={({ isActive }) =>
            `${
              isActive ? "underlined" : "hover-underline-animation"
            } text-[#545e6f]`
          }
        >
          ΔΙΕΘΝΗ
        </NavLink>
        <NavLink
          to="/category/ΟΙΚΟΝΟΜΙΑ"
          className={({ isActive }) =>
            `${
              isActive ? "underlined" : "hover-underline-animation"
            } text-[#545e6f]`
          }
        >
          ΟΙΚΟΝΟΜΙΑ
        </NavLink>
        <NavLink
          to="/category/ΚΟΙΝΩΝΙΑ"
          className={({ isActive }) =>
            `${
              isActive ? "underlined" : "hover-underline-animation"
            } text-[#545e6f]`
          }
        >
          ΚΟΙΝΩΝΙΑ
        </NavLink>
        <NavLink
          to="/5"
          className={({ isActive }) =>
            `${
              isActive ? "underlined" : "hover-underline-animation"
            } text-[#545e6f]`
          }
        >
          ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ
        </NavLink>
        <NavLink
          to="/6"
          className={({ isActive }) =>
            `${
              isActive ? "underlined" : "hover-underline-animation"
            } text-[#545e6f]`
          }
        >
          ΕΠΙΚΟΙΝΩΝΙΑ
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
