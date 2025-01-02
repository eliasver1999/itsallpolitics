import React from "react";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";
import { useSelector } from "react-redux";
import { state } from "../../types/initial";
import { NavLink } from "react-router-dom";
type Props = {};

const Footer = (props: Props) => {
  const { category } = useSelector((state: state) => state);
  return (
    <div className="flex flex-col  bottom-0">
      <div className=" bg-zinc-800 py-4">
        <div className="grid lg:grid-cols-4 items-start justify-between lg:px-24  px-12 gap-4">
          <div className=" mt-4">
            <h3 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ
            </h3>
            <p className="text-gray-200 text-justify">
              Το It's All Politics είναι ένα νεοσύστατο site που δημιουργήθηκε
              από φοιτητές του τμήματος Πολιτικής Επιστήμης & Ιστορίας του
              Παντείου Πανεπιστημίου. Κύριο μέλημα ειναι να παρουσιάζονται με
              κατανοητό τρόπο θέματα πολιτικά και κοινωνικοοικονομικά και να
              προωθηθεί το αίσθημα του διαλόγου στα φλέγοντα ζητήματα της
              επικαιρότητας.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΜENOY
            </h2>
            <ul className="text-gray-200 list-disc text-center space-y-4 ">
              <li>
                <a
                  href="/"
                  className="hover:text-[#9544cf]/80 transition-all duration-300"
                >
                  ΑΡΧΙΚΗ
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-[#9544cf]/80 transition-all duration-300"
                >
                  Σχετικά με εμάς
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-[#9544cf]/80 transition-all duration-300"
                >
                  Επικοινωνία
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΚΑΤΗΓΟΡΙΕΣ
            </h2>
            <ul className="text-gray-200 list-disc text-center space-y-4">
              {category.map((cat) => {
                return (
                  <li>
                    <NavLink
                      className="hover:text-[#9544cf]/80 transition-all duration-300"
                      to={"/category/" + cat.id}
                    >
                      {cat.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΕΠΙΚΟΙΝΩΝΙΑ
            </h3>
            <ul className="text-gray-200 list-none text-center space-y-4">
              <li>
                <AiOutlineInstagram
                  className="inline-block mr-4"
                  size={22}
                  color="#9544cf"
                />
                <a
                  className="inline-block"
                  href="https://www.instagram.com/itsallpolitics.gr/"
                >
                  itsallpolitics.gr
                </a>
              </li>
              <li>
                <AiOutlineFacebook
                  className="inline-block mr-4"
                  size={22}
                  color="#9544cf"
                />
                <a
                  className="inline-block"
                  href="https://www.facebook.com/share/1HnyqUr2WN/?mibextid=wwXIfr"
                >
                  itsallpolitics.gr
                </a>
              </li>
              <li>
                <AiOutlineMail
                  className="inline-block mr-4"
                  size={22}
                  color="#9544cf"
                />
                <h4 className="inline-block">itsallpolitics2023@gmail.com</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900">
        <h3 className="text-center text-gray-100">All rights reserved</h3>
      </div>
    </div>
  );
};

export default Footer;
